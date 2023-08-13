const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')
const { format, addDays } = require('date-fns');


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))


//Image handling
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/includes/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})


function capitalizeFirstWord(str) {
    const trimmedStr = str.trim();
    const firstWord = trimmedStr.split(' ')[0];
    const capitalizedFirstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
    const capitalizedString = trimmedStr.replace(firstWord, capitalizedFirstWord);
    return capitalizedString;
}


//Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'agri-hub'
})



app.post("/product/insert", upload.single('image'), (req, res) => {
    const name = req.body.name;
    const ptype = req.body.ptype;
    const qty = req.body.qty;
    const price = req.body.price;
    const categoryId = req.body.categoryId;
    const shipping = req.body.shipping;
    const image = req.file.filename;

    const new_name = capitalizeFirstWord(name);
    const new_ptype = capitalizeFirstWord(ptype);

    const offer = Math.floor(Math.random() * (16) + 10); //10 to 26

    const expiry = req.body.expiry;
    const currentDate = new Date();
    const newDate = addDays(currentDate, expiry);
    const formattedDate = format(newDate, 'yyyy-MM-dd');

    const Farmer_id = 1;

    const qry = "INSERT INTO products (Prod_name,Prod_type,Prod_qty,Prod_price,Prod_image1,Prod_cat_id, Prod_expiry, Prod_offer, Shipping_charge) VALUES(?,?,?,?,?,?,?,?,?);"
    db.query(qry, [new_name, new_ptype, qty, price, image, categoryId, formattedDate, offer, shipping], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send({ msg: "Product inserted Successfully" })
        }
    })
})

app.put("/product/update", upload.single(), (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const ptype = req.body.ptype;
    const qty = req.body.qty;
    const price = req.body.price;
    const shipping = req.body.shipping;
    const categoryId = req.body.categoryId;

    const new_name = capitalizeFirstWord(name);
    const new_ptype = capitalizeFirstWord(ptype);

    let qry = `UPDATE products SET Prod_name='${new_name}',Prod_type='${new_ptype}',Prod_price='${price}',Prod_qty='${qty}',Prod_cat_id='${categoryId}',Shipping_charge='${shipping}' WHERE Prod_id=${id}`;
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send({ msg: "Order updated Successfully" })
        }
    })
})

app.delete("/product/delete/:id", (req, res) => {
    const id = req.params.id;
    let qry = `DELETE FROM products WHERE Prod_id=${id}`;
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send({ msg: "Order deleted successfully" })
        }
    })
})


app.get("/product/getall", (req, res) => {
    const qry = "SELECT p.*,c.Measure FROM products AS p, categories as c WHERE p.Prod_status=1 AND p.Prod_cat_id=c.Category_id ORDER BY Prod_id DESC;"
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    })
})

app.get("/product/get/:id", (req, res) => {
    const id = req.params.id;
    let qry = `SELECT p.*,c.Measure FROM products AS p,categories AS c WHERE p.Prod_id=${id} AND p.Prod_cat_id=c.Category_id;`;
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.get("/product/getCategoryWiseProduct/:categoryId", (req, res) => {
    const id = req.params.categoryId;
    let qry;
    if (id == '*') {
        qry = "SELECT p.*,c.Measure FROM products AS p,categories AS c WHERE Prod_status=1 AND p.Prod_cat_id=c.Category_id ORDER BY Prod_id DESC;";
    }
    else {
        qry = qry = `SELECT p.*,c.Measure FROM products AS p,categories AS c WHERE Prod_cat_id=${id} AND Prod_status=1 AND p.Prod_cat_id=c.Category_id ORDER BY Prod_id DESC;`;
    }
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.get("/product/getallcategory", (req, res) => {
    const qry = "SELECT * FROM categories;"
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})

app.get("/product/getcategory/:id", (req, res) => {
    const id = req.params.id;
    const qry = `SELECT * FROM categories WHERE Category_id=${id};`
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})



//Retailer order

app.post("/order/insert", upload.single(), (req, res) => {
    const retailer_id = req.body.retailer_id;
    const prod_id = req.body.prod_id;
    const qty = req.body.qty;
    const price = req.body.price;

    const qry = "INSERT INTO retailerorders (Retailer_id,Prod_id,Quantity,Price) VALUES(?,?,?,?);"
    db.query(qry, [retailer_id, prod_id, qty, price], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status({ msg: "Order placed Successfully" })
        }
    })
})


app.post("/order/customInsert", upload.single(), (req, res) => {
    const id = req.body.id;
    const qty = req.body.qty;
    const price = req.body.price;
    const profit = req.body.profit;
    const status = 'Sold to your customer.';

    db.query(`SELECT Prod_qty FROM products WHERE Prod_id=${id}`, (err, result) => {
        if (result) {
            let availiableQty;
            if (qty <= (result[0].Prod_qty - 50)) {
                availiableQty = result[0].Prod_qty - qty
                db.query(`UPDATE products SET Prod_qty=Prod_qty-${qty} WHERE Prod_id=${id}`, (err, result) => {
                    db.query(`SELECT Order_id, Quantity FROM retailerorders WHERE Prod_id=${id} AND Order_status NOT LIKE '%cancelled the order.' AND Order_status NOT LIKE 'Order delivered successfully.'`, (err, result1) => {
                        if (result1) {
                            result1.forEach(row => {
                                if (row.Quantity > availiableQty) {
                                    db.query(`UPDATE retailerorders SET Order_status='Farmer cancelled the order.' WHERE Order_id=${row.Order_id}`, () => {
                                    })
                                }
                            });
                        }
                    })
                })
            }
            else {
                db.query(`UPDATE products SET Prod_status=0, Prod_qty=0 WHERE Prod_id=${id}`, () => {
                    db.query(`UPDATE retailerorders SET Order_status='Farmer cancelled the order.' WHERE Prod_id=${id}`, (err, result) => {
                    })
                });
            }
        }
    })

    const qry = "INSERT INTO retailerorders (Prod_id,Quantity,Price,Profit,Order_status) VALUES(?,?,?,?,?);"
    db.query(qry, [id, qty, price, profit, status], (err, result) => { })
})


app.put("/order/successUpdate", upload.single(), (req, res) => {
    const orderId = req.body.orderId;
    const earn = req.body.earn;

    db.query(`SELECT p.Prod_qty,r.Quantity,r.Prod_id FROM products AS p, retailerorders AS r WHERE r.Order_id=${orderId} AND r.Prod_id=p.Prod_id`, (err, result) => {
        let availiableQty;

        if (result) {
            if (result[0].Quantity <= (result[0].Prod_qty - 50)) {
                availiableQty = result[0].Prod_qty - result[0].Quantity
                db.query(`UPDATE products SET Prod_qty=Prod_qty-${result[0].Quantity} WHERE Prod_id=${result[0].Prod_id}`, (err, result1) => {
                    db.query(`SELECT Order_id, Quantity FROM retailerorders WHERE Prod_id=${result[0].Prod_id} AND Order_status NOT LIKE '%cancelled the order.' AND Order_status NOT LIKE 'Order delivered successfully.' AND Order_id!=${orderId}`, (err, result1) => {
                        if (result1) {
                            result1.forEach(row => {
                                if (row.Quantity > availiableQty) {
                                    db.query(`UPDATE retailerorders SET Order_status='Farmer cancelled the order.' WHERE Order_id=${row.Order_id}`, () => {
                                    })
                                }
                            });
                        }
                    })
                })
            }
            else {
                db.query(`UPDATE products SET Prod_status=0, Prod_qty=0 WHERE Prod_id=${result[0].Prod_id}`, () => {
                })
                db.query(`UPDATE retailerorders SET Order_status='Farmer cancelled the order.' WHERE Prod_id=${result[0].Prod_id} AND Order_id!=${orderId}`, () => {
                })
            }

            db.query(`UPDATE retailerorders SET Order_status='Order delivered successfully.',Profit=${earn} WHERE Order_id=${orderId}`, () => {
            })
        }
    })
})


app.delete("/order/delete/:id", (req, res) => {
    const id = req.params.id;
    let qry = `DELETE FROM retailerorders WHERE Order_id=${id}`;
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send({ msg: "Order deleted successfully" })
        }
    })
})


app.put("/order/changestatus/:id", upload.single(), (req, res) => {
    let qry;
    const id = req.params.id;
    const status = req.body.status;
    if (req.body.charge) {
        const charge = req.body.charge;
        qry = `UPDATE retailerorders SET Order_status="${status}",Extra_charge=${charge} WHERE Order_id=${id}`;
    }
    else {
        qry = `UPDATE retailerorders SET Order_status="${status}" WHERE Order_id=${id}`;
    }
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send({ msg: "Order updated Successfully" })
        }
    })
})


app.get("/order/getall", (req, res) => {
    let status;
    const ch = req.query.choice;
    if (ch == 1) {
        status = `o.Order_status NOT LIKE '%Farmer cancelled the order.'`;
    }
    else if (ch == 2) {
        status = `(o.Order_status LIKE "%placed order." OR o.Order_status LIKE "Waiting for retailer's confirmation.")`;
    }
    else if (ch == 3) {
        status = `o.Order_status LIKE '%confirmed order.'`;
    }
    else if (ch == 4) {
        status = `o.Order_status LIKE '% cancelled the order.'`;
    }
    else if (ch == 5) {
        status = `o.Order_status LIKE 'Order delivered successfully.'`;
    }

    //Retailer side orders

    else if (ch == 11) {
        status = `o.Order_status NOT LIKE '%Retailer cancelled the order.'`;
    }

    const qry = `SELECT r.*,o.*,p.* FROM retailerorders AS o, retailers AS r, products AS p WHERE o.Retailer_id=r.Retailer_id AND o.Prod_id=p.Prod_id AND ${status} ORDER BY o.Order_id DESC;`
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    })
})


//Retailer
app.post("/retailer/insertCart", upload.single(), (req, res) => {
    const prodId = req.body.prodId;
    const cartQty = req.body.cartQty;
    const cartPrice = req.body.cartPrice;

    const qry = "INSERT INTO carts (Prod_id,Cart_quantity,Cart_price) VALUES(?,?,?);"
    db.query(qry, [prodId, cartQty, cartPrice], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status({ msg: "Added to cart Successfully" })
        }
    })
})

app.delete("/retailer/deletecartitem/:cartid", (req, res) => {
    const cartid = req.params.cartid;
    let qry = `DELETE FROM carts WHERE Cart_id=${cartid}`;
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send({ msg: "Item removed from cart successfully" })
        }
    })
})

app.put("/retailer/updatecart", upload.single(), (req, res) => {
    const cartId = req.body.cartId;
    const cartQty = req.body.cartQty;
    const cartPrice = req.body.cartPrice;

    db.query(`UPDATE carts SET Cart_quantity=${cartQty},Cart_price=${cartPrice} WHERE Cart_id=${cartId}`, () => {
    })
})

app.get("/retailer/getcartitems", (req, res) => {
    const qry = "SELECT * FROM carts AS c, products AS p WHERE c.Prod_id=p.Prod_id;"
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})

//Queries
app.post("/query/insert", upload.single(), (req, res) => {
    const farmerId = req.body.farmerId;
    const retailerId = req.body.retailerId;
    const productId = req.body.productId;
    const orderId = req.body.orderId;
    const issue = req.body.issue;
    const description = req.body.description;
    const status = 'In process';

    const qry = "INSERT INTO queries (Farmer_id,Retailer_id,Product_id,Order_id,Query_name,Query_description,Query_status) VALUES(?,?,?,?,?,?,?);"
    db.query(qry, [farmerId, retailerId, productId, orderId, issue, description, status], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status({ msg: "Query added Successfully" })
        }
    })
})

app.get("/query/getall", (req, res) => {
    const qry = "SELECT * FROM queries;"
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})


app.get("/query/getpending", (req, res) => {
    const qry = "SELECT * FROM queries WHERE Query_status='In process';"
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})

app.get("/query/get/:id", (req, res) => {

    const id = req.params.id;
    let qry1;

    const qry = `SELECT * FROM queries WHERE Query_id=${id};`
    db.query(qry, (err, result) => {
        if (result) {
            if (result[0].Query_name === 'Add Category') {
                qry1 = `SELECT f.Farmer_email,q.* FROM farmers AS f,queries as q WHERE q.Query_id=${id} AND q.Farmer_id=f.Farmer_id`
                db.query(qry1, (err, result1) => {
                    if (result1) {
                        res.send(result1);
                    }
                })
            }

        }
    })
})

app.put("/query/changestatus/:id", upload.single(), (req, res) => {
    const id = req.params.id;
    const reason=req.body.reason;
    
    let qry = `UPDATE queries SET Query_status='Rejected', Query_description='${reason}' WHERE Query_id=${id}`;
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send({ msg: "Order deleted successfully" })
        }
    })
})


app.post("/admin/insertCategory", upload.single(), (req, res) => {
    const name = req.body.name;
    const measure = req.body.measure;
    const expiry = req.body.expiry;

    const qry = "INSERT INTO categories (Category_name,Measure,Expiry) VALUES(?,?,?);"
    db.query(qry, [name, measure, expiry], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status({ msg: "Category added Successfully" })
        }
    })

    if (req.body.queryId) {
        const id=req.body.queryId;
        const qry1=`UPDATE queries SET Query_status='Solved' WHERE Query_id=${id}` 
        db.query(qry1, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.status({ msg: "Status updated Successfully" })
            }
        })
    }
})

//Farmer
app.post("/farmer/insert", upload.single(), (req, res) => {
    const name = req.body.name;
    const district = req.body.district;
    const contact = req.body.contact;
    const email = req.body.email;
    const pass = req.body.pass;

    const qry = "INSERT INTO farmers (Farmer_name,Farmer_district,Farmer_contact,Farmer_email,Farmer_pass) VALUES(?,?,?,?,?);"
    db.query(qry, [name, district, contact, email, pass], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status({ msg: "Farmer added successfully" })
        }
    })
})


//Retailer
app.post("/retailer/insert", upload.single(), (req, res) => {
    const name = req.body.name;
    const district = req.body.district;
    const contact = req.body.contact;
    const email = req.body.email;
    const pass = req.body.pass;

    const qry = "INSERT INTO retailers (Retailer_name,Retailer_district,Retailer_contact,Retailer_email,Retailer_pass) VALUES(?,?,?,?,?);"
    db.query(qry, [name, district, contact, email, pass], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status({ msg: "Retailer added successfully" })
        }
    })
})

//Admin
app.post('/admin/login', (req, res) => {
    const { email, pass } = req.body;

    if (email === 'sam@gmail.com' && pass === 'Sam@1234') {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });

app.listen(8000, () => {
    console.log("Running on port 8000")
})
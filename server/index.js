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
    database: 'agrihubtemp'
})



app.post("/product/insert", upload.single('image'), (req, res) => {
    const id = req.body.id;
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

    const qry = `INSERT INTO products (Prod_name,Prod_type,Prod_qty,Prod_price,Prod_image1,Prod_cat_id, Prod_expiry, Prod_offer, Shipping_charge, Farmer_id) VALUES(?,?,?,?,?,?,?,?,?,?);`
    db.query(qry, [new_name, new_ptype, qty, price, image, categoryId, formattedDate, offer, shipping, id], (err, result) => {
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

app.post("/product/getallfarmer", (req, res) => {
    const id = req.body.id;
    const qry = `SELECT p.*,c.Measure FROM products AS p, categories as c WHERE p.Prod_status=1 AND p.Prod_cat_id=c.Category_id AND p.Farmer_id=${id} ORDER BY Prod_id DESC;`
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
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
        qry = `SELECT p.*,c.Measure FROM products AS p,categories AS c WHERE Prod_cat_id=${id} AND Prod_status=1 AND p.Prod_cat_id=c.Category_id ORDER BY Prod_id DESC;`;
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

app.get("/order/getallretailer", (req, res) => {
    let status;
    const ch = req.query.choice;
    const id = req.query.temp;

    if (ch == 1) {
        status = `o.Order_status NOT LIKE '%Retailer cancelled the order.'`;
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

    const qry = `SELECT r.*,o.*,p.* FROM retailerorders AS o, retailers AS r, products AS p WHERE o.Retailer_id=r.Retailer_id AND o.Prod_id=p.Prod_id AND ${status} AND o.Retailer_id=${id} ORDER BY o.Order_id DESC;`
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    })
})



app.get("/order/getall", (req, res) => {
    let status;
    const ch = req.query.choice;
    const id = req.query.temp;

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

    const qry = `SELECT r.*,o.*,p.* FROM retailerorders AS o, retailers AS r, products AS p WHERE o.Retailer_id=r.Retailer_id AND o.Prod_id=p.Prod_id AND ${status} AND p.Farmer_id=${id} ORDER BY o.Order_id DESC;`
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
    const usrId = req.body.usrId;
    const prodId = req.body.prodId;
    const cartQty = req.body.cartQty;
    const cartPrice = req.body.cartPrice;
    const qry = `SELECT c.Cart_id,c.Cart_quantity,p.Prod_qty from carts AS c,products AS p WHERE c.Cart_retailer_id=? AND c.Prod_id=? AND c.Prod_id=p.Prod_id`

    db.query(qry, [usrId, prodId], (err, result) => {
        if (result.length === 1) {
            if (result[0].Cart_quantity + parseInt(cartQty) <= result[0].Prod_qty - 50 || result[0].Cart_quantity + parseInt(cartQty) == result[0].Prod_qty) {
                const qry1 = "UPDATE carts SET Cart_quantity=Cart_quantity+?,Cart_price=Cart_price+? WHERE Cart_id=?;"
                db.query(qry1, [cartQty, cartPrice, result[0].Cart_id], (err, result1) => {
                    if (result1) {
                        res.json({ cartStatus: '' })
                    }
                })
            }
            else {
                res.json({ cartStatus: 'Enough quantity not availiable to add this product to cart' })
            }
        }
        else {
            const qry1 = "INSERT INTO carts (Cart_retailer_id,Prod_id,Cart_quantity,Cart_price) VALUES(?,?,?,?);"
            db.query(qry1, [usrId, prodId, cartQty, cartPrice], (err, result1) => {
                if (result) {
                    res.json({ cartStatus: '' })
                }
            })
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

app.post("/retailer/getcartitems", (req, res) => {
    const id = req.body.id;
    const qry = `SELECT * FROM carts AS c, products AS p WHERE c.Prod_id=p.Prod_id AND c.Cart_retailer_id=${id};`
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

app.post("/query/getall", (req, res) => {
    const { id, usr } = req.body
    let qry=`SELECT * FROM queries WHERE Query_user='${usr}' AND Query_user_id=${id}`;
    db.query(qry, [usr, id], (err, result) => {
        if (result) {
            res.send(result)
        }
    })
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


//Login validation -Admin, Farmer, Retailer
app.post('/user/login', (req, res) => {
    const { email, pass, user } = req.body;
    let qry;

    if (user === 'Retailer') {
        qry = `SELECT Retailer_id as i,Retailer_email as e, Retailer_pass as p FROM retailers WHERE Retailer_email = ?`;
    }
    else if (user === 'Farmer') {
        qry = `SELECT Farmer_id as i,Farmer_email as e, Farmer_pass as p FROM farmers WHERE Farmer_email = ?`;
    }
    else if (user === 'Admin') {
        qry = `SELECT Admin_id as i,Admin_email as e, Admin_pass as p FROM admins WHERE Admin_email = ?`;
    }

    db.query(qry, [email], (err, result) => {
        if (result) {
            if (result.length === 1 && result[0].p === pass) {
                res.json({ success: true, usrId: result[0].i });
            } else {
                res.json({ success: false });
            }
        } else {
            res.json({ success: false });
        }
    });
});

//Register validation - Farmer, Retailer
app.post('/user/insert', (req, res) => {
    const { name, area, village, district, contact, email, pass, user } = req.body;
    let qry;
    let qry1;
    const new_name = capitalizeFirstWord(name);

    if (user === 'Retailer') {
        qry = `SELECT Retailer_email as e FROM retailers WHERE Retailer_email = ?`;
        qry1 = `INSERT INTO retailers (Retailer_name,Retailer_area,Retailer_village,Retailer_district,Retailer_contact,Retailer_email,Retailer_pass) VALUES(?,?,?,?,?,?,?);`;
    }
    else if (user === 'Farmer') {
        qry = `SELECT Farmer_email as e FROM farmers WHERE Farmer_email = ?`;
        qry1 = `INSERT INTO farmers (Farmer_name,Farmer_area,Farmer_village,Farmer_district,Farmer_contact,Farmer_email,Farmer_pass) VALUES(?,?,?,?,?,?,?);`
    }

    db.query(qry, [email], (err, result) => {
        if (result.length === 1) {
            res.json({ userExists: true });
        }
        else {
            db.query(qry1, [new_name, area, village, district, contact, email, pass], (err, result1) => {
                if (result1) {
                    res.json({ success: true, usrId: result1.insertId });
                }
                else {
                    res.json({ success: false });
                }
            })
        }
    });
});


//Retailer
app.get("/user/getretailers", (req, res) => {
    const qry = "SELECT Retailer_id AS id,Retailer_name AS name,Retailer_area AS area,Retailer_village AS village,Retailer_district AS district,Retailer_contact AS contact,Retailer_email AS email FROM retailers"
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    })
})

app.put("/user/updateRetailer", (req, res) => {
    const { rname, area, village, district, contact, rid } = req.body;
    const qry = `UPDATE retailers SET Retailer_name=?, Retailer_area=?,Retailer_village=?,Retailer_district=?, Retailer_contact=? WHERE Retailer_id=?`

    db.query(qry, [rname, area, village, district, contact, rid], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    })
})

app.put("/user/terminateRetailer", (req, res) => {
    const { id } = req.body;
    const qry = `UPDATE retailers SET Retailer_pass=? WHERE Retailer_id=?`

    db.query(qry, ['temp1234*', id], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    })
})

//Farmer
app.get("/user/getfarmers", (req, res) => {
    const qry = "SELECT Farmer_id AS id,Farmer_name AS name,Farmer_district AS district,Farmer_contact AS contact,Farmer_email AS email FROM farmers"
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    })
})

app.put("/user/updateFarmer", (req, res) => {
    const { rname, district, contact, email, rid } = req.body;
    const qry = `UPDATE farmers SET Farmer_name=?, Farmer_district=?, Farmer_contact=?, Farmer_email=? WHERE Farmer_id=?`

    db.query(qry, [rname, district, contact, email, rid], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    })
})

app.put("/user/terminateFarmer", (req, res) => {
    const { id } = req.body;
    const qry = `UPDATE farmers SET Farmer_pass=? WHERE Farmer_id=?`

    db.query(qry, ['temp1234*', id], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    })
})

app.post("/user/get", (req, res) => {
    const { id, choice } = req.body;
    let qry;

    if (choice == 'retailer') {
        qry = `SELECT Retailer_name AS name,Retailer_area AS area,Retailer_village AS village,Retailer_district AS district,Retailer_contact AS contact,Retailer_email AS email FROM retailers WHERE Retailer_id=${id}`
    }
    else if (choice == 'farmer') {
        qry = `SELECT Farmer_name AS name,Farmer_area AS area,Farmer_village AS village,Farmer_district AS district,Farmer_contact AS contact,Farmer_email AS email FROM farmers WHERE Farmer_id=${id}`
    }

    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    })
})

app.put('/user/update', (req, res) => {
    const { name, area, village, district, contact, choice, id } = req.body;
    let qry;
    const new_name = capitalizeFirstWord(name);

    if (choice === 'retailer') {
        qry = `UPDATE retailers SET Retailer_name=?,Retailer_area=?,Retailer_village=?,Retailer_district=?,Retailer_contact=? WHERE Retailer_id=?;`;
    }
    else if (choice === 'farmer') {
        qry = `UPDATE farmers SET Farmer_name=?,Farmer_area=?,Farmer_village=?,Farmer_district=?,Farmer_contact=? WHERE Farmer_id=?;`
    }

    db.query(qry, [new_name, area, village, district, contact, id], (err, result) => {
        if (result) {
            res.json({ success: true })
        }
        else {
            res.json({ success: false });
        }
    })
})

app.put('/user/changepass', (req, res) => {
    const { pass, choice, id } = req.body;
    let qry;
    let qry1;

    if (choice === 'retailer') {
        qry = `SELECT Retailer_pass as p FROM retailers WHERE Retailer_id = ?`;
        qry1 = `UPDATE retailers SET Retailer_pass=? WHERE Retailer_id=?;`;
    }
    else if (choice === 'farmer') {
        qry = `SELECT Farmer_pass as p FROM farmers WHERE Farmer_id = ?`;
        qry1 = `UPDATE farmers SET Farmer_pass=? WHERE Farmer_id=?;`;
    }

    db.query(qry, [id], (err, result) => {
        if (result[0].p === pass) {
            res.json({ samepass: true });
        }
        else {
            db.query(qry1, [pass, id], (err, result1) => {
                if (result1) {
                    res.json({ success: true });
                }
                else {
                    res.json({ success: false });
                }
            })
        }
    });
});

app.put('/user/changeemail', (req, res) => {
    const { email, choice, id } = req.body;
    let qry;
    let qry1;

    if (choice === 'retailer') {
        qry = `SELECT Retailer_email as e FROM retailers WHERE Retailer_email = ?`;
        qry1 = `UPDATE retailers SET Retailer_email=? WHERE Retailer_id=?;`;
    }
    else if (choice === 'farmer') {
        qry = `SELECT Farmer_email as e FROM farmers WHERE Farmer_email = ?`;
        qry1 = `UPDATE farmers SET Farmer_email=? WHERE Farmer_id=?;`;
    }

    db.query(qry, [email], (err, result) => {
        if (result.length === 1) {
            res.json({ emailExists: true });
        }
        else {
            db.query(qry1, [email, id], (err, result1) => {
                if (result1) {
                    res.json({ success: true });
                }
                else {
                    res.json({ success: false });
                }
            })
        }
    });
})



//ADMIN
app.post('/admin/getorder', (req, res) => {
    const { user, email, name } = req.body;
    console.log(user, email, name)
    let qry;

    if (user == 'farmer') {
        qry = `SELECT o.*,p.* FROM retailerorders AS o,farmers AS f,products AS p WHERE o.Prod_id=p.Prod_id AND p.Prod_name= ? AND p.Farmer_id=f.Farmer_id AND f.Farmer_email=?`
    }

    db.query(qry, [name, email], (err, result) => {
        if (result) {
            res.send(result);
        }
    });
})




app.listen(8000, () => {
    console.log("Running on port 8000")
})
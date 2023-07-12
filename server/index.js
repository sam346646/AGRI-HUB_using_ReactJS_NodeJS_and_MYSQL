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
    const image = req.file.filename;

    const new_name = capitalizeFirstWord(name);
    const new_ptype = capitalizeFirstWord(ptype);

    const offer = Math.floor(Math.random() * (16) + 10); //10 to 26

    const expiry = req.body.expiry;
    const currentDate = new Date();
    const newDate = addDays(currentDate, expiry);
    const formattedDate = format(newDate, 'yyyy-MM-dd');

    const Farmer_id = 1;

    const qry = "INSERT INTO products (Prod_name,Prod_type,Prod_qty,Prod_price,Prod_image1,Prod_cat_id, Prod_expiry, Prod_offer) VALUES(?,?,?,?,?,?,?,?);"
    db.query(qry, [new_name, new_ptype, qty, price, image, categoryId, formattedDate, offer], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            const qry1 = "INSERT INTO orders (Farmer_id,Product_id,Quantity) VALUES(?,?,?);"
            db.query(qry1, [Farmer_id, result.insertId, qty], (err, result1) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.send({ msg: "Order inserted Successfully" })
                }
            })
        }
    })
})

app.put("/product/update", upload.single(), (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const ptype = req.body.ptype;
    const qty = req.body.qty;
    const price = req.body.price;
    const categoryId = req.body.categoryId;

    const new_name = capitalizeFirstWord(name);
    const new_ptype = capitalizeFirstWord(ptype);

    let qry = `UPDATE products SET Prod_name='${new_name}',Prod_type='${new_ptype}',Prod_price='${price}',Prod_qty='${qty}',Prod_cat_id='${categoryId}' WHERE Prod_id=${id}`;
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


app.get("/order/getall", (req, res) => {
    const qry = "SELECT r.*,o.*,p.* FROM retailerorders AS o, retailers AS r, products AS p WHERE o.Retailer_id=r.Retailer_id AND o.Prod_id=p.Prod_id;"
    db.query(qry, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    })
})


app.listen(8000, () => {
    console.log("Running on port 8000")
})
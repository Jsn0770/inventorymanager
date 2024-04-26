const port = 4000;
const express = require("express");
const app = express();
const jwt = require("jswebtoken");
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const Product = require('./schema');

app.use(express.json());
app.use(cors());

// Conexão com o Banco de Dados 
mongoose.connect("mongodb+srv://odestruidor07:zfP80no07HowzcEc@cluster0.2y1i1pr.mongodb.net/InventoryManager")

// API Creation

app.get("/", (req, res) => {
    res.send("Express App is Running")
})

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

// Create Upload Endpoint for images
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })

})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    res.json({
        sucess: true,
        name: req.body.name,
    })
})

// Creating API for deleting Products

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({
        sucess: true,
        name: req.body.name,
    })

})

// Creating API for getting all Products

app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    res.send(products);
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const products = await Product.findOne({ id})

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).send('Falha ao buscar produtos')
    }
});

// app.use(require('./routes'));

app.listen(port, (error) => {
    if (!error) {
        console.log("Server rodando na porta " + port)
    }
    else {
        console.log("Erro: " + error)
    }
})
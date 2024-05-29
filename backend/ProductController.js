const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");

class ProductController {
    constructor() {
        this.router = express.Router();
        this.configureStorage();
        this.configureRoutes();
    }

    configureStorage() {
        this.storage = multer.diskStorage({
            destination: './upload/images',
            filename: (req, file, cb) => {
                return cb(null, ${file.fieldname}_${Date.now()}${path.extname(file.originalname)})
            }
        });

        this.upload = multer({ storage: this.storage });
    }

    configureRoutes() {
        this.router.post("/upload", this.upload.single('product'), this.uploadImage);
        this.router.post("/addproduct", this.addProduct);
        this.router.post("/removeproduct", this.removeProduct);
        this.router.get("/allproducts", this.getAllProducts);
        this.router.post("/updateproduct", this.updateProduct);
    }

    uploadImage(req, res) {
        if (!req.file) {
            return res.status(400).json({ success: 0, message: "No file uploaded" });
        }
        res.json({
            success: 1,
            image_url: http://localhost:4000/images/${req.file.filename}
        });
    }

    async addProduct(req, res) {
        try {
            let products = await Product.find({});
            let id;
            if (products.length > 0) {
                let last_product_array = products.slice(-1);
                let last_product = last_product_array[0];
                id = last_product.id + 1;
            } else {
                id = 1;
            }
            const product = new Product({
                id: id,
                name: req.body.name,
                image: req.body.image,
                category: req.body.category,
                new_price: req.body.new_price,
                quantity: req.body.quantity
            });
            await product.save();
            res.json({
                success: true,
                name: req.body.name,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async removeProduct(req, res) {
        await Product.findOneAndDelete({ id: req.body.id });
        res.json({
            success: true,
            name: req.body.name,
        });
    }

    async getAllProducts(req, res) {
        let products = await Product.find({});
        res.send(products);
    }

    async updateProduct(req, res) {
        await Product.findOneAndUpdate({ id: req.body.id }, {
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            quantity: req.body.quantity
        });
        res.json({
            success: true,
            name: req.body.name,
        });
    }
}

module.exports = ProductController;

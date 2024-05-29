// controllers/UserController.js
const express = require("express");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

class UserController {
    constructor() {
        this.router = express.Router();
        this.configureRoutes();
    }

    configureRoutes() {
        this.router.post("/signup", this.signup);
        this.router.post("/login", this.login);
        this.router.get("/newcollections", this.getNewCollections);
        this.router.get("/popular", this.getPopular);
        this.router.post("/addtocart", AuthMiddleware, this.addToCart);
        this.router.post("/removefromcart", AuthMiddleware, this.removeFromCart);
        this.router.post("/getcart", AuthMiddleware, this.getCart);
    }

    async signup(req, res) {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Email já cadastrado" })
        }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        })

        await user.save();

        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token })
    }

    async login(req, res) {
        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            const passCompare = req.body.password === user.password;
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data, 'secret_ecom');
                res.json({ success: true, token });
            } else {
                res.json({ success: false, errors: "Senha Incorreta" })
            }
        } else {
            res.json({ success: false, errors: "Email Incorreto" })
        }
    }

    async getNewCollections(req, res) {
        let products = await Product.find({});
        let newcollection = products.slice(1).slice(-8);
        res.send(newcollection);
    }

    async getPopular(req, res) {
        let products = await Product.find({ category: "timesestrangeiros" });
        let popular = products.slice(0, 4);
        res.send(popular);
    }

    async addToCart(req, res) {
        let userData = await Users.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Adicionado");
    }

    async removeFromCart(req, res) {
        let userData = await Users.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
        }
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removido");
    }

    async getCart(req, res) {
        let userData = await Users.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    }
}

module.exports = UserController;

const express = require("express");
const Server = require("./Server");
const Database = require("./database");
const ProductController = require("./controllers/productcontroller");
const UserController = require("./controllers/usercontroller");

const app = express();
const port = 4000;

const database = new Database();
const productController = new ProductController(database.Product);
const userController = new UserController(database.Users);

const server = new Server(app, port, database, productController, userController);
server.start();

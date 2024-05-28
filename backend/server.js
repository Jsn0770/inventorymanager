const express = require("express");
const cors = require("cors");
const Database = require("./database");
const ProductController = require("./controllers/ProductController");
const UserController = require("./controllers/UserController");
const port = 4000;

class Server {
    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();
        this.database = new Database();
        this.database.connect();
    }

    configureMiddleware() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use('/images', express.static('upload/images'));
    }

    configureRoutes() {
        this.app.get("/", (req, res) => {
            res.send("Express App is Running");
        });

        const productController = new ProductController();
        const userController = new UserController();

        this.app.use('/products', productController.router);
        this.app.use('/users', userController.router);
    }

    start() {
        this.app.listen(port, (error) => {
            if (!error) {
                console.log("Server rodando na porta " + port);
            } else {
                console.log("Erro: " + error);
            }
        });
    }
}

const server = new Server();
server.start();
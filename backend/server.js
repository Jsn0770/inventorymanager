const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

class Server {
    constructor(app, port, database, productController, userController, Users) {
        this.app = app;
        this.port = port;
        this.database = database;
        this.productController = productController;
        this.userController = userController;
        this.upload = this.configureMulter();
    }

    configureMulter() {
        const storage = multer.diskStorage({
            destination: './upload/images',
            filename: (req, file, cb) => {
                cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
            }
        });
        return multer({ storage: storage });
    }

    async start() {
        this.app.use(express.json());
        this.app.use(cors());

        await this.database.syncModels();

        // Rota para verificar se o servidor está rodando
        this.app.get("/", (req, res) => {
            res.send("Express App is Running");
        });

        // Rota para upload de imagens
        this.app.post("/upload", this.upload.single('product'), (req, res) => {
            res.json({
                success: 1,
                image_url: `http://localhost:${this.port}/images/${req.file.filename}`
            });
        });

         // Rota para servir imagens
         this.app.use('/images', express.static('upload/images'));

        // Rotas para produtos
        this.app.post('/addproduct', async (req, res) => {
            const { name, image, category, new_price, quantity } = req.body;
            const result = await this.productController.addProduct(name, image, category, new_price, quantity);
            res.json(result);
        });

        this.app.post('/removeproduct', async (req, res) => {
            const result = await this.productController.removeProduct(req.body.id);
            res.json(result);
        });

        this.app.get('/allproducts', async (req, res) => {
            const products = await this.productController.getAllProducts();
            res.send(products);
        });

        this.app.post('/updateproduct', async (req, res) => {
            const { id, name, image, category, new_price, quantity } = req.body;
            const result = await this.productController.updateProduct(id, name, image, category, new_price, quantity);
            res.json(result);
        });

        this.app.get('/newcollections', async (req, res) => {
            const products = await this.productController.getNewCollections();
            res.send(products);
        });

        this.app.get('/popular', async (req, res) => {
            const products = await this.productController.getPopularProducts();
            res.send(products);
        });

        // Rotas para usuários
        this.app.post('/signup', async (req, res) => {
            const { username, email, password } = req.body;
            const result = await this.userController.signup(username, email, password);
            res.json(result);
        });

        this.app.post('/login', async (req, res) => {
            const { email, password } = req.body;
            const result = await this.userController.login(email, password);
            res.json(result);
        });

        this.app.get('/users', async (req, res) => {
            const users = await this.userController.getAllUsers();
            res.json(users);
        });

        this.app.post('/removeuser', async (req, res) => {
            const result = await this.userController.removeUser(req.body.id);
            res.json(result);
        });

        this.app.post('/addtocart', async (req, res) => {
            try {
                const userId = req.user.id; 
                const itemId = req.body.itemId; 
    
                let user = await this.Users.findByPk(userId);
    
                if (!user) {
                    return res.status(404).send("Usuário não encontrado");
                }
    
                let cartData = user.cartData || {};
    
                cartData[itemId] = (cartData[itemId] || 0) + 1;
    
                await user.update({ cartData });
    
                res.send("Item adicionado ao carrinho com sucesso");
            } catch (error) {
                console.error("Erro ao adicionar ao carrinho:", error);
                res.status(500).send("Erro ao adicionar ao carrinho");
            }
        });

        this.app.post('/removefromcart', async (req, res) => {
            try {
                const userId = req.user.id; 
                const itemId = req.body.itemId;
    
                let user = await this.Users.findByPk(userId);
    
                if (!user) {
                    return res.status(404).send("Usuário não encontrado");
                }
    
                let cartData = user.cartData || {};
    
                if (cartData[itemId] && cartData[itemId] > 0) {
                    cartData[itemId] -= 1;
                }
    
                await user.update({ cartData });
    
                res.send("Item removido do carrinho com sucesso");
            } catch (error) {
                console.error("Erro ao remover do carrinho:", error);
                res.status(500).send("Erro ao remover do carrinho");
            }
        });

        this.app.post('/getcart', async (req, res) => {
            try {
                const userId = req.user.id;
    
                let user = await this.Users.findByPk(userId);
    
                if (!user) {
                    return res.status(404).send("Usuário não encontrado");
                }
    
                res.json(user.cartData || {});
            } catch (error) {
                console.error("Erro ao obter dados do carrinho:", error);
                res.status(500).send("Erro ao obter dados do carrinho");
            }
        });

        this.app.listen(this.port, () => {
            console.log("Server running on port " + this.port);
        });
    }
}

module.exports = Server;

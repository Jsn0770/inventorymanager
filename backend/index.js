const port = 4000;
const express = require("express");
const app = express();
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Conexão com o Banco de Dados
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// Definição dos modelos
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    new_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    avilable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

const Users = sequelize.define('Users', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    cartData: {
        type: DataTypes.JSON
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
});

// Sincronizar os modelos com o banco de dados
sequelize.sync();

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

// API para adicionar produtos
app.post('/addproduct', async (req, res) => {
    const { name, image, category, new_price, quantity } = req.body;
    const product = await Product.create({
        name,
        image,
        category,
        new_price,
        quantity
    });
    res.json({
        success: true,
        name: req.body.name,
    });
})

// API para remover produtos
app.post('/removeproduct', async (req, res) => {
    await Product.destroy({ where: { id: req.body.id } });
    res.json({
        success: true,
        name: req.body.name,
    })
})

// API para obter todos os produtos
app.get('/allproducts', async (req, res) => {
    const products = await Product.findAll();
    res.send(products);
})

// API para atualizar produtos
app.post('/updateproduct', async (req, res) => {
    await Product.update({
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        quantity: req.body.quantity
    }, {
        where: { id: req.body.id }
    });
    res.json({
        success: true,
        name: req.body.name,
    });
})

// Endpoint para registrar o usuário
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    let check = await Users.findOne({ where: { email } });
    if (check) {
        return res.status(400).json({ success: false, errors: "Email já cadastrado" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = await Users.create({
        name: username,
        email,
        password,
        cartData: cart,
    });

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
})

// Endpoint para login de usuário
app.post('/login', async (req, res) => {
    const user = await Users.findOne({ where: { email: req.body.email } });
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
            res.json({ success: false, errors: "Senha Incorreta" });
        }
    } else {
        res.json({ success: false, errors: "Email Incorreto" });
    }
})

// Endpoint para obter novos produtos
app.get('/newcollections', async (req, res) => {
    const products = await Product.findAll();
    const newcollection = products.slice(1).slice(-8);
    res.send(newcollection);
})

// Endpoint para obter produtos populares
app.get('/popular', async (req, res) => {
    const products = await Product.findAll({ where: { category: "timesestrangeiros" } });
    const popular = products.slice(0, 4);
    res.send(popular);
})

// Middleware para buscar usuário
const fetchuser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using valid token" });
        }
    }
}

// Endpoint para adicionar produtos no carrinho
app.post('/addtocart', fetchuser, async (req, res) => {
    let userData = await Users.findOne({ where: { id: req.user.id } });
    userData.cartData[req.body.itemId] += 1;
    await userData.save();
    res.send("Adicionado");
})

// Endpoint para remover produtos do carrinho
app.post('/removefromcart', fetchuser, async (req, res) => {
    let userData = await Users.findOne({ where: { id: req.user.id } });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await userData.save();
    res.send("Removido");
})

// Endpoint para obter dados do carrinho
app.post('/getcart', fetchuser, async (req, res) => {
    let userData = await Users.findOne({ where: { id: req.user.id } });
    res.json(userData.cartData);
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server rodando na porta " + port);
    } else {
        console.log("Erro: " + error);
    }
});

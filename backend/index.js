// const port = 4000;
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");

// app.use(express.json());
// app.use(cors());

// // Conexão com o Banco de Dados 
// mongoose.connect("mongodb+srv://odestruidor07:zfP80no07HowzcEc@cluster0.2y1i1pr.mongodb.net/InventoryManager")

// // API Creation

// app.get("/", (req, res) => {
//     res.send("Express App is Running")
// })

// // Image Storage Engine

// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({ storage: storage })

// // Create Upload Endpoint for images
// app.use('/images', express.static('upload/images'))

// app.post("/upload", upload.single('product'), (req, res) => {
//     res.json({
//         success: 1,
//         image_url: `http://localhost:${port}/images/${req.file.filename}`
//     })

// })


// // Schema for Creating Products
// const Product = mongoose.model("Product",{
//     id:{
//         type: Number,
//         required: true,
//     },
//     name:{
//         type: String,
//         required: true,
//     },
//     image:{
//         type: String,
//         required: true,
//     },
//     category:{
//         type: String,
//         required: true,
//     },
//     new_price:{
//         type: Number,
//         required: true,
//     },
//     quantity:{  // Novo campo adicionado
//         type: Number,
//         required: true,
//         default: 1, // Definindo um valor padrão
//     },
//     date:{
//         type: Date,
//         default:Date.now,
//     },
//     avilable:{
//         type: Boolean,
//         default: true,
//     },  
// })

// app.post('/addproduct', async (req, res) => {
//     let products = await Product.find({});
//     let id;
//     if (products.length > 0) {
//         let last_product_array = products.slice(-1);
//         let last_product = last_product_array[0];
//         id = last_product.id + 1;
//     } else {
//         id = 1;
//     }
//     const product = new Product({
//         id: id,
//         name: req.body.name,
//         image: req.body.image,
//         category: req.body.category,
//         new_price: req.body.new_price,
//         old_price: req.body.old_price,
//         quantity: req.body.quantity // Adicionando quantidade na criação de produto
//     });
//     console.log(product);
//     await product.save();
//     res.json({
//         success: true,
//         name: req.body.name,
//     });
// })

// // Creating API for deleting Products

// app.post('/removeproduct', async (req, res) => {
//     await Product.findOneAndDelete({ id: req.body.id });
//     res.json({
//         success: true,
//         name: req.body.name,
//     })

// })

// // Creating API for getting all Products

// app.get('/allproducts', async (req, res) => {
//     let products = await Product.find({});
//     console.log("Todos Produtos Listados");
//     res.send(products);
// })

// // Creating API for updating Products

// app.post('/updateproduct', async (req, res) => {
//     await Product.findOneAndUpdate({ id: req.body.id }, {
//         name: req.body.name,
//         image: req.body.image,
//         category: req.body.category,
//         new_price: req.body.new_price,
//         quantity: req.body.quantity // Atualizando a quantidade
//     });
//     res.json({
//         success: true,
//         name: req.body.name,
//     });
// })

// // Schema creating for User model

// const Users = mongoose.model('Users', {
//     name: {
//         type:String,
//     },
//     email: {
//         type:String,
//         unique:true,
//     },
//     password: {
//         type: String,
//     },
//     cartData: {
//         type: Object,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     }
// })

// // Creating Endpoint for registering the user

// app.post('/signup',async(req, res)=>{

//     let check = await Users.findOne({email:req.body.email});
//     if (check) {
//         return res.status(400).json({success:false,errors:"Email já cadastrado"})
//     }
//     let cart = {};
//     for (let i = 0; i < 300; i++) {
//         cart[i] = 0;
//     }
//     const user = new Users({
//         name: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//         cartData: cart,
//     })

//     await user.save();

//     const data = {
//         user: {
//             id: user.id
//         }
//     }

//     const token = jwt.sign(data, 'secret_ecom');
//     res.json({success:true, token})
// })

// // creating endpoint for user login
// app.post('/login', async(req,res)=>{
//     let user = await Users.findOne({email:req.body.email});
//     if (user) {
//         const passCompare = req.body.password === user.password;
//         if (passCompare) {
//             const data = {
//                 user: {
//                     id:user.id
//                 }
//             }
//             const token = jwt.sign(data, 'secret_ecom');
//             res.json({success:true, token});
//         }
//         else {
//             res.json({success:false, errors:"Senha Incorreta"})
//         }
//     }
//     else {
//         res.json({success:false,errors:"Email Incorreto"})
//     }
// })

// // creating endpoint for newcollection data
// app.get('/newcollections', async (req,res)=>{
//     let products = await Product.find({});
//     let newcollection = products.slice(1).slice(-8);
//     console.log("New Colletcions Fetched")
//     res.send(newcollection);
// }) 

// // creating endpoint for popular section
// app.get('/popular', async (req,res)=>{
//     let products = await Product.find({category:"timesestrangeiros"});
//     let popular = products.slice(0,4)
//     console.log("Popular Fetched")
//     res.send(popular);
// })

// // creating middleware to fetch user
// const fetchuser = async (req,res,next) =>{
//     const token = req.header('auth-token');
//     if (!token) {
//         res.status(401).send({errors:"Please authenticate using valid token"})
//     }
//     else {
//         try {
//             const data = jwt.verify(token,'secret_ecom');
//             req.user = data.user;
//             next();
//         } catch (error) {
//             res.status(401).send({errors:"please authenticate using valid token"})
//         }
//     }
// }

// // creating endpoint for adding products in cartdata
// app.post('/addtocart',fetchuser, async (req,res)=>{
//     console.log("Adicionado",req.body.itemId);
//     let userData = await Users.findOne({_id:req.user.id});
//     userData.cartData[req.body.itemId] += 1;
//     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
//     res.send("Adicionado")
// })

// // creating endpoint for remove products in cartdata
// app.post('/removefromcart',fetchuser, async (req,res)=>{
//     console.log("Removido",req.body.itemId);
//     let userData = await Users.findOne({_id:req.user.id});
//     if(userData.cartData[req.body.itemId]>0)
//     userData.cartData[req.body.itemId] += 1;
//     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
//     res.send("Adicionado")
// })

// // creating endpoint to get cartdata
// app.post('/getcart',fetchuser,async (req,res) =>{
//     console.log("Obter Carrinho");
//     let userData = await Users.findOne({_id:req.user.id});
//     res.json(userData.cartData);
// })

// app.listen(port, (error) => {
//     if (!error) {
//         console.log("Server rodando na porta " + port)
//     }
//     else {
//         console.log("Erro: " + error)
//     }
// })
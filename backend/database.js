// database.js
const mongoose = require("mongoose");

class Database {
    constructor() {
        this.uri = "mongodb+srv://odestruidor07:zfP80no07HowzcEc@cluster0.2y1i1pr.mongodb.net/InventoryManager";
    }

    connect() {
        mongoose.connect(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).then(() => {
            console.log("Conectado ao MongoDB");
        }).catch(err => {
            console.log("Erro ao conectar ao MongoDB: ", err);
        });
    }
}

module.exports = Database;

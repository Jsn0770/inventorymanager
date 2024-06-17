const { Sequelize, DataTypes } = require('sequelize');

class Database {
    constructor() {
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'database.sqlite'
        });
        this.Product = this.defineProduct();
        this.Users = this.defineUsers();
    }

    defineProduct() {
        return this.sequelize.define('Product', {
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
    }

    defineUsers() {
        return this.sequelize.define('Users', {
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
    }

    async syncModels() {
        await this.sequelize.sync();
    }
}

module.exports = Database;

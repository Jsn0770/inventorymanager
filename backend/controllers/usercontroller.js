const jwt = require("jsonwebtoken");

class UserController {
    constructor(userModel) {
        this.Users = userModel;
    }

    async signup(username, email, password) {
        let check = await this.Users.findOne({ where: { email } });
        if (check) {
            return { success: false, errors: "Email já cadastrado" };
        }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const user = await this.Users.create({
            name: username,
            email,
            password,
            cartData: cart,
        });

        const data = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(data, 'secret_ecom');
        return { success: true, token };
    }

    async login(email, password) {
        const user = await this.Users.findOne({ where: { email } });
        if (user) {
            const passCompare = password === user.password;
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id
                    }
                };
                const token = jwt.sign(data, 'secret_ecom');
                return { success: true, token };
            } else {
                return { success: false, errors: "Senha Incorreta" };
            }
        } else {
            return { success: false, errors: "Email Incorreto" };
        }
    }

    async getAllUsers() {
        try {
            const users = await this.Users.findAll();
            return users;
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async removeUser(id) {
        await this.Users.destroy({ where: { id } });
        return { success: true };
    }
}

module.exports = UserController;

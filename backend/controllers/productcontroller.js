class ProductController {
    constructor(productModel) {
        this.Product = productModel;
    }

    async addProduct(name, image, category, new_price, quantity) {
        await this.Product.create({
            name,
            image,
            category,
            new_price,
            quantity
        });
        return { success: true, name };
    }

    async removeProduct(id) {
        await this.Product.destroy({ where: { id } });
        return { success: true };
    }

    async getAllProducts() {
        const products = await this.Product.findAll();
        return products;
    }

    async updateProduct(id, name, image, category, new_price, quantity) {
        await this.Product.update({
            name,
            image,
            category,
            new_price,
            quantity
        }, {
            where: { id }
        });
        return { success: true, name };
    }

    async getNewCollections() {
        const products = await this.Product.findAll();
        const newcollection = products.slice(-8);
        return newcollection;
    }

    async getPopularProducts() {
        const products = await this.Product.findAll({ where: { category: "timesestrangeiros" } });
        const popular = products.slice(0, 4);
        return popular;
    }
}

module.exports = ProductController;

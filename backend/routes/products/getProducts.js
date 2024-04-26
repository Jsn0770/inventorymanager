const Product = require('../../schema')

module.exports = async function getProduct(req, res) {
  try {
    const products = await Product.find({})

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send('Falha ao buscar produtos')
  }
}
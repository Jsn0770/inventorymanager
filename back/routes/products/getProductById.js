const Product = require('../../schema')

module.exports = async (req, res) => {
  const { id } = req.params
  try {
    const products = await Product.findById(id).exec();

    console.log(products);

    return res.status(200).json(products);
  } catch (error) { 
    console.log('entrou')
    return res.status(500).send('Falha ao buscar produtos')
  }
}
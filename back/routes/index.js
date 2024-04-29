const express = require('express')

const routes = express.Router({ mergeParams: true });

routes.use('/products', require('./products'));

module.exports = routes;
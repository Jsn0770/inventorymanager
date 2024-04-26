const express = require('express');

const routes = express.Router({ mergeParams: true });

routes.get('/', require('./getProducts'));

routes.get('/:id', require('./getProductById'));

module.exports = routes;
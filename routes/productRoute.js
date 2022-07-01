const { Router } = require('express');
const rescue = require('express-rescue');
const productController = require('../controllers/productController');

const productRoute = Router();

productRoute.get('/', productController.getAll);

productRoute.get('/:id', productController.getById);

productRoute.post('', rescue(productController.insertNew));

productRoute.put('/:id', rescue(productController.update));

module.exports = productRoute;
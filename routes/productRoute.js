const { Router } = require('express');
const productController = require('../controllers/productController');

const productRoute = Router();

productRoute.get('/', productController.getAll);

productRoute.get('/:id', productController.getById);

productRoute.post('', productController.insertNew);

module.exports = productRoute;
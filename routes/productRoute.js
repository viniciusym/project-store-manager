const { Router } = require('express');
const rescue = require('express-rescue');
const productController = require('../controllers/productController');

const productRoute = Router();

productRoute.get('/', productController.getAll);

productRoute.get('/search', productController.getByTerm);

productRoute.get('/:id', productController.getById);

productRoute.post('', rescue(productController.insertNew));

productRoute.put('/:id', rescue(productController.update));

productRoute.delete('/:id', productController.delete);

module.exports = productRoute;
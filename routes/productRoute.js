const { Router } = require('express');
const rescue = require('express-rescue');
const productController = require('../controllers/productController');
const productErrorHandler = require('../middlewares/productErrorHandler');

const productRoute = Router();

productRoute.get('/', rescue(productController.getAll));

productRoute.get('/search', rescue(productController.getByTerm));

productRoute.get('/:id', rescue(productController.getById));

productRoute.post('/', rescue(productController.insertNew));

productRoute.put('/:id', rescue(productController.update));

productRoute.delete('/:id', rescue(productController.delete));

productRoute.use(productErrorHandler);

module.exports = productRoute;
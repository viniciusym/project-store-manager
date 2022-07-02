const { Router } = require('express');
const rescue = require('express-rescue');
const productController = require('../controllers/productController');

const productRoute = Router();

productRoute.get('/', rescue(productController.getAll));

productRoute.get('/search', rescue(productController.getByTerm));

productRoute.get('/:id', rescue(productController.getById));

productRoute.post('', rescue(productController.insertNew));

productRoute.put('/:id', rescue(productController.update));

productRoute.delete('/:id', rescue(productController.delete));

productRoute.use((err, _req, res, _next) => {
  const { message } = err;
  switch (message) {
    case 'Product not found':
      res.status(404).json({ message });
      break;
    case '"name" is required':
      res.status(400).json({ message });
      break;
    case '"name" length must be at least 5 characters long':
      res.status(422).json({ message });
      break;
    default:
      res.status(500).json(err);
      break;
  }
});

module.exports = productRoute;
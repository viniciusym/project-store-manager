const { Router } = require('express');
const rescue = require('express-rescue');
const saleController = require('../controllers/saleController');

const saleRoute = Router();

saleRoute.post('', rescue(saleController.makeNewSale));

saleRoute.get('/:id', saleController.getById);

saleRoute.get('', saleController.getAll);

saleRoute.delete('/:id', saleController.delete);

saleRoute.put('/:id', rescue(saleController.update));

saleRoute.use((err, _req, res, _next) => {
  const { message } = err;
  const regexProductId = /.+?\.productId/;
  const regexQuantity = /.+?\.quantity/;
  switch (true) {
    case regexProductId.test(message):
      res.status(400).json({ message: '"productId" is required' });
      break;
    case regexQuantity.test(message) && message.includes('greater'):
      res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
      break;
    case regexQuantity.test(message):
      res.status(400).json({ message: '"quantity" is required' });
      break;
    default:
      res.satus(500).json(err);
      break;
  }
});

module.exports = saleRoute;
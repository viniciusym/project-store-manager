const { Router } = require('express');
const rescue = require('express-rescue');
const saleController = require('../controllers/saleController');
const saleErrorHandlers = require('../middlewares/saleErrorHandlers');

const saleRoute = Router();

saleRoute.post('/', rescue(saleController.makeNewSale));

saleRoute.get('/:id', rescue(saleController.getById));

saleRoute.get('/', rescue(saleController.getAll));

saleRoute.delete('/:id', rescue(saleController.delete));

saleRoute.put('/:id', rescue(saleController.update));

saleRoute.use(saleErrorHandlers);

module.exports = saleRoute;
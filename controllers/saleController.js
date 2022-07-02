const productService = require('../services/productService');
const saleService = require('../services/saleService');

const saleController = {
  async makeNewSale(req, res) {
    const { body } = req;
    await saleService.validateNewSale(body);
    const listOfProductsExists = await productService.checkIfListOfProductsExists(body);
    if (listOfProductsExists) {
      const saleData = await saleService.makeNewSale(body);
      return res.status(201).json(saleData);
    }
    return res.status(404).json({ message: 'Product not found' }); 
  },
  async update(req, res) {
    const { body } = req;
    const { id } = req.params;
    await saleService.validateNewSale(body);
    const listOfProductsExists = await productService.checkIfListOfProductsExists(body);
    const saleNotFoundMessage = { message: 'Sale not found' };
    const saleExists = await saleService.exists(id);
    if (!saleExists) {
      return res.status(404).json(saleNotFoundMessage);
    }
    if (listOfProductsExists) {
      const saleUpdates = await saleService.update(body, id);
      return res.status(200).json(saleUpdates);
    }
    return res.status(404).json({ message: 'Product not found' });
  },
  async getAll(_req, res) {
    const allSales = await saleService.getAll();
    res.status(200).json(allSales);
  },
  async getById(req, res) {
    const { id } = req.params;
    const saleNotFoundMessage = { message: 'Sale not found' };
    const saleExists = await saleService.exists(id);
    if (!saleExists) {
      return res.status(404).json(saleNotFoundMessage);
    }
    const sales = await saleService.getById(id);
    res.status(200).json(sales);
  },
  async delete(req, res) {
    const { id } = req.params;
    const saleNotFoundMessage = { message: 'Sale not found' };
    const saleExists = await saleService.exists(id);
    if (!saleExists) {
      return res.status(404).json(saleNotFoundMessage);
    }
    await saleService.delete(id);
    res.sendStatus(204);
  },
};

module.exports = saleController;
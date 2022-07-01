const productService = require('../services/productService');
const saleService = require('../services/saleService');

const saleController = {
  async makeNewSale(req, res) {
    const { body } = req;
    await saleService.validateNewSale(body);
    const exists = await productService.checkIfListOfProductsExists(body);
    if (exists) {
      const saleData = await saleService.makeNewSale(body);
      return res.status(201).json(saleData);
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
};

module.exports = saleController;
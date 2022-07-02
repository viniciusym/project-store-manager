const productService = require('../services/productService');
const saleService = require('../services/saleService');

const saleController = {
  async makeNewSale(req, res) {
    const { body } = req;
    await saleService.validateNewSale(body);
    await productService.checkIfListOfProductsExists(body);
    const saleData = await saleService.makeNewSale(body);
    return res.status(201).json(saleData);
  },
  async update(req, res) {
    const { body } = req;
    const { id } = req.params;
    await saleService.validateNewSale(body);
    await productService.checkIfListOfProductsExists(body);
    await saleService.exists(id);
    const saleUpdates = await saleService.update(body, id);
    return res.status(200).json(saleUpdates);
  },
  async getAll(_req, res) {
    const allSales = await saleService.getAll();
    res.status(200).json(allSales);
  },
  async getById(req, res) {
    const { id } = req.params;
    await saleService.exists(id);
    const sales = await saleService.getById(id);
    res.status(200).json(sales);
  },
  async delete(req, res) {
    const { id } = req.params;
    await saleService.exists(id);
    await saleService.delete(id);
    res.sendStatus(204);
  },
};

module.exports = saleController;
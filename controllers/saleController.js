const saleService = require('../services/saleService');

const saleController = {
  async makeNewSale(req, res) {
    const { body } = req;
    await saleService.validateNewSale(body);
    const exists = await saleService.checkIfProductsExists(body);
    if (exists) {
      const saleData = await saleService.makeNewSale(body);
      return res.status(201).json(saleData);
    }
    return res.status(404).json({ message: 'Product not found' }); 
  },
};

module.exports = saleController;
const productService = require('../services/productService');

const productController = {
  async getAll(_req, res) {
    const products = await productService.getAll();
    res.status(200).json(products);
  },
  async getById(req, res) {
    const { id } = req.params;
    const productExits = await productService.exists(id);
    if (!productExits) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const product = await productService.getById(id);
    res.status(200).json(product);
  },
};

module.exports = productController;
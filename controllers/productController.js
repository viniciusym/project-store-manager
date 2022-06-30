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
  async insertNew(req, res) {
    const { body } = req;
    await productService.validateNewProduct(body);
    const newProductObject = await productService.insertNew(body);
    res.status(201).json(newProductObject);
  },
};

module.exports = productController;
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
  async update(req, res) {
    const { body } = req;
    const { id } = req.params;
    await productService.validateNewProduct(body);
    const productExits = await productService.exists(id);
    if (!productExits) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const updatedProduct = await productService.update(body, id);
    res.status(200).json(updatedProduct);
  },
  async delete(req, res) {
    const { id } = req.params;
    const productExits = await productService.exists(id);
    if (!productExits) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await productService.delete(id);
    res.sendStatus(204);
  },
};

module.exports = productController;
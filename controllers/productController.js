const productService = require('../services/productService');

const productController = {
  async getAll(_req, res) {
    const products = await productService.getAll();
    res.status(200).json(products);
  },
  async getByTerm(req, res) {
    const { q } = req.query;
    const product = await productService.getByTerm(q);
    res.status(200).json(product);
  },
  async getById(req, res) {
    const { id } = req.params;
    await productService.exists(id);
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
    await productService.exists(id);
    const updatedProduct = await productService.update(body, id);
    res.status(200).json(updatedProduct);
  },
  async delete(req, res) {
    const { id } = req.params;
    await productService.exists(id);
    await productService.delete(id);
    res.sendStatus(204);
  },
};

module.exports = productController;
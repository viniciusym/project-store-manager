const productModel = require('../models/productModel');

const productService = {
  async getAll() {
    const products = await productModel.getAll();
    return products;
  },
  async exists(id) {
    const productExists = await productModel.exists(id);
    return productExists;
  },
  async getById(id) {
    const product = await productModel.getById(id);
    return product;
  },
  async insertNew(product) {
    const productInsertedId = await productModel.insertNew(product);
    const newProductObject = { id: productInsertedId, ...product };
    return newProductObject;
  },
};

module.exports = productService;
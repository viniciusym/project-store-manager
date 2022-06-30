const Joi = require('joi');
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
  async validateNewProduct(product) {
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
    });
    await schema.validateAsync(product);
  },
};

module.exports = productService;
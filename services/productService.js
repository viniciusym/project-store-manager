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
  async update(productChanges, id) {
    await productModel.update(productChanges, id);
    return { ...productChanges, id };
  },
  async validateNewProduct(product) {
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
    });
    await schema.validateAsync(product);
  },
  async checkIfListOfProductsExists(products) {
    const existsPromises = [];
    products.forEach(async ({ productId }) => {
      existsPromises.push(productModel.exists(productId));
    });
    const existsAll = await Promise.all(existsPromises);
    return existsAll.every((productExists) => productExists);
  },
  async getByTerm(term) {
    const product = await productModel.getByTerm(term);
    return product;
  },
  async delete(id) {
    await productModel.delete(id);
  },
};

module.exports = productService;  
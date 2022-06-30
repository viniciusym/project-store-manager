const Joi = require('joi');
const saleModel = require('../models/saleModel');
const { exists } = require('./productService');

const saleService = {
  async validateNewSale(saleProducts) {
    const productObject = Joi.object({
      productId: Joi.number().required(),
      quantity: Joi.number().min(1).required(),
    });
    const schema = Joi.array().items(productObject);
    await schema.validateAsync(saleProducts);
  },
  async makeNewSale(saleProducts) {
    const newSaleId = await saleModel.insertNewSale();
    const productsKeyValues = saleProducts
      .map(({ productId, quantity }) => ([productId, quantity, newSaleId]));
    await saleModel.insertNewSaleProducts(productsKeyValues);
    const saleobject = {
      id: newSaleId,
      itemsSold: saleProducts,
    };
    return saleobject;
  },
  async checkIfProductsExists(products) {
    const existsPromises = [];
    products.forEach(async ({ productId }) => {
      existsPromises.push(exists(productId));
    });
    const existsAll = await Promise.all(existsPromises);
    return existsAll.every((productExists) => productExists); 
  },
};

module.exports = saleService;
const Joi = require('joi');
const saleModel = require('../models/saleModel');

const saleService = {
  async getAll() {
    const allSales = await saleModel.getAll();
    return allSales;
  },
  async exists(id) {
    const saleExists = await saleModel.exists(id);
    return saleExists;
  },
  async getById(id) {
    const sales = await saleModel.getById(id);
    return sales;
  },
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
  async update(saleChanges, id) {
    const salesChangeValues = saleChanges
      .map(({ productId, quantity }) => ([productId, quantity]));
    await saleModel.update(salesChangeValues, id);
    const saleobject = {
      id,
      itemsSold: saleChanges,
    };
    return saleobject;
  },
  async delete(id) {
    await saleModel.delete(id);
  },
};

module.exports = saleService;
const Joi = require('joi');
const SaleNotFoundError = require('../errors/SaleNotFoundError');
const saleModel = require('../models/saleModel');

const productIdKey = 'product_id';

const saleService = {
  async getAll() {
    const allSales = await saleModel.getAll();
    return allSales;
  },
  async exists(id) {
    const saleExists = await saleModel.exists(id);
    if (!saleExists) {
      throw new SaleNotFoundError('Sale not found');
    }
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
    const allSales = await saleModel.getSalesForUpdate(id);
    const updatePromises = allSales
      .map(async (sale, index) => {
        const oldSaleValues = Object.values(sale);
        const changesObject = {
          [productIdKey]: saleChanges[index].productId,
          quantity: saleChanges[index].quantity,
        };
        const promise = saleModel.update(changesObject, id, oldSaleValues);
        return promise;
      });
    await Promise.all(updatePromises);
    const updateObject = {
      saleId: id,
      itemsUpdated: saleChanges,
    };
    return updateObject;
  },
  async delete(id) {
    await saleModel.delete(id);
  },
};

module.exports = saleService;
const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const saleModel = require('../../../models/saleModel');
const saleService = require('../../../services/saleService');

describe('services/saleService', () => {
  beforeEach(sinon.restore);

  describe('makeNewSale', () => {
    it('deve retornar o objeto com os dados da venda caso o model consiga adicionar a venda', async () => {
      sinon.stub(saleModel, 'insertNewSale').resolves(3);
      sinon.stub(saleModel, 'insertNewSaleProducts').resolves();
      const saleData = {
        "id": 3,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 1
          },
        ]
      };[]
      const saleProducts = [{ "productId": 1, "quantity": 1 }]
      const response = await saleService.makeNewSale(saleProducts);

      expect(response).to.deep.equal(saleData);
    })
  });

  describe('checkIfProductsExists', () => {
    it('deve retornar true caso todos os produtos existam', async () => {
      sinon.stub(productModel, 'exists').resolves(true);
      const productsExists = await saleService.checkIfProductsExists([{}]);

      expect(productsExists).to.be.true
    });
    it('deve retornar false caso algum produto não exista', async () => {
      sinon.stub(productModel, 'exists').resolves(false);
      const productsExists = await saleService.checkIfProductsExists([{}]);

      expect(productsExists).to.be.false
    })
  });
});
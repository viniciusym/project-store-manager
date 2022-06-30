const { expect } = require('chai');
const saleModel = require('../../../models/saleModel');
const connection = require('../../../models/db');
const sinon = require('sinon');

describe('models/saleModel', () => {
  beforeEach(sinon.restore);

  describe('insertNewSale', () => {
    it('deve retornar undefined a venda não for adicionada no DB', async () => {
      sinon.stub(connection, 'query').resolves([{}]);

      const saleResponse = await saleModel.insertNewSale();

      expect(saleResponse).to.be.undefined;
    });
    it('deve retornar o id da venda caso for adicionada no DB', async () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
      
      const saleResponse = await saleModel.insertNewSale();

      expect(saleResponse).to.be.equal(1);
    })
  });

  describe('insertNewSaleProducts', () => {

  });
})
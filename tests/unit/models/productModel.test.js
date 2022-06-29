const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/db');
const productModel = require('../../../models/productModel');

describe('models/productModel', () => {
  beforeEach(() => sinon.restore());
  
  describe('getAll', () => {
    it('deve retornar undefined caso não tenha itens no DB', async () => {
      sinon.stub(connection, 'query').returns([]);

      const response = await productModel.getAll();

      expect(response).to.be.undefined;
    });


  });


});
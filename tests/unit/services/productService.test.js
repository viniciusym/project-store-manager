const sinon = require('sinon');
const { expect } = require('chai');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

describe('/services/productService', () => {
  beforeEach(() => sinon.restore());

  describe('getAll', () => {
    it('deve retornar undefined caso o model não ache produtos', async () => {
      sinon.stub(productModel, 'getAll').returns(undefined);

      const response = await productService.getAll();

      expect(response).to.be.undefined;
    });
    it('deve retornar uma lista com os produtos', async () => {
      const productsList = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ]
      sinon.stub(productModel, 'getAll').returns(productsList);

      const response = await productService.getAll();

      expect(response).to.deep.equal(productsList);
    });
  });

  describe('exists', () => {
    it('deve retornar false caso o model não ache o produto', async () => {
      sinon.stub(productModel, 'exists').returns(false);

      const response = await productService.exists();

      expect(response).to.be.false;
    });
    it('deve retornar true caso o model ache o produto', async () => {
      sinon.stub(productModel, 'exists').returns(true);

      const response = await productService.exists();

      expect(response).to.be.true;
    });

  });

});
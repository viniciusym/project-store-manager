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
    it('deve retornar uma lista com os produtos', async () => {
      const productsList = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ]
      sinon.stub(connection, 'query').returns([productsList]);

      const response = await productModel.getAll();

      expect(response).to.deep.equal(productsList);
    });
  });

  describe('exists', () => {
    it('deve retornar false caso o produto não exista no DB', async () => {
      sinon.stub(connection, 'query').returns([[]]);

      const response = await productModel.exists();

      expect(response).to.be.false;
    });
    it('deve retornar true caso o produto exista no DB', async () => {
      sinon.stub(connection, 'query').returns([[{ id: 1, name: 'Martelo de Thor' }]]);

      const response = await productModel.exists();

      expect(response).to.be.true;
    });
  });

  describe('getById', () => {
    it('deve retornar undefined caso o produto não exista no DB', async () => {
      sinon.stub(connection, 'query').returns([[]]);

      const response = await productModel.getById(999);

      expect(response).to.be.undefined
    });
    it('deve retornar o objeto do produto caso o produto exista no DB', async () => {
      sinon.stub(connection, 'query').returns([[{ id: 1, name: 'Martelo de Thor' }]]);

      const response = await productModel.getById(1);

      expect(response).to.deep.equal({ id: 1, name: 'Martelo de Thor' });
    });
  });

  describe('insertNew', () => {
    it('deve retornar undefined caso o produto não for adicionado no DB', async () => {
      sinon.stub(connection, 'query').returns([{}]);

      const response = await productModel.insertNew({});

      expect(response).to.be.undefined
    });
    it('deve retornar o novo id do produto for adicionado com sucesso no DB', async () => {
      sinon.stub(connection, 'query').returns([{ insertId: 1 }]);

      const response = await productModel.insertNew({ name: 'produtc' });

      expect(response).to.be.equal(1);
    });
  });

  describe('update', () => {
    it('a função não deve retornar nada', async () => {
      sinon.stub(connection, 'query').resolves();

      const response = await productModel.update();

      expect(response).to.be.undefined
    });
  });

  describe('delete', () => {
    it('a função não deve retornar nada', async () => {
      sinon.stub(connection, 'query').resolves();

      const response = await productModel.delete();

      expect(response).to.be.undefined
    });
  });

});
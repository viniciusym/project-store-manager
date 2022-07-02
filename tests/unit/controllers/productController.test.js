const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('controllers/productController', () => {
  beforeEach(() => sinon.restore());

  describe('getAll', () => {
    it('deve retornar o status 200 e uma lista de produtos', async () => {
      const response = {};
      const request = {};
      const productsList = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ]
      sinon.stub(productService, 'getAll').resolves(productsList);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await productController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(productsList)).to.be.equal(true);
    });
  });

  describe('getById', () => {
    it('deve retornar o status 200 e o objeto do produto quando o service retornar com sucesso', async () => {
      const response = {};
      const request = {};
      const productObject= { id: 1, name: 'Martelo de Thor' }
      sinon.stub(productService, 'getById').resolves(productObject);
      sinon.stub(productService, 'exists').resolves(true);
      request.params = {
        id: 1
      }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await productController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(productObject)).to.be.equal(true);
    }); 
  });

  describe('insertNew', () => {
    it('deve retornar o status 201 e uma lista de produtos caso as validações passarem', async () => {
      const response = {};
      const request = {};
      request.body = { name: '1' };
      const newProductObject = { name: '1', id: 1 };
      sinon.stub(productService, 'validateNewProduct').resolves();
      sinon.stub(productService, 'insertNew').resolves(newProductObject);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await productController.insertNew(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith(newProductObject)).to.be.equal(true);
    });
  });

  describe('update', () => {
    it('deve retornar o status 200 e o objeto do produto atualizado quando o service retornar com sucesso as validações', async () => {
      const response = {};
      const request = {};
      const productObject = { id: 1, name: 'Martelo do Batman' }
      sinon.stub(productService, 'update').resolves(productObject);
      sinon.stub(productService, 'exists').resolves(true);
      request.params = {
        id: 1
      }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await productController.update(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(productObject)).to.be.equal(true);
    });
  });

  describe('delete', () => {
    it('deve retornar somente o status 204 quando o service retornar com sucesso todas as validações e a remoção do produto', async () => {
      const response = {};
      const request = {};
      sinon.stub(productService, 'delete').resolves();
      sinon.stub(productService, 'exists').resolves(true);
      request.params = {
        id: 1
      }
      response.sendStatus = sinon.stub().returns(response);

      await productController.delete(request, response);

      expect(response.sendStatus.calledWith(204)).to.be.equal(true);
    });
  });
});
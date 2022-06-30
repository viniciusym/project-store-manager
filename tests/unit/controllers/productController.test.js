const sinon = require('sinon');
const { expect } = require('chai');
const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');

describe('/services/productService', () => {
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
    it('se o produto não existir deve retornar o status 404 e o a mensagem "Product not found" ', async () => {
      const response = {};
      const request = {};
      const productNotFoundMessage = { message: 'Product not found' };
      sinon.stub(productService, 'exists').resolves(false);
      request.params = {
        id: 2
      }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await productController.getById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith(productNotFoundMessage)).to.be.equal(true);
    }); 
  });
});
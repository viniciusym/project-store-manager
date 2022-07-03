const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

chai.use(chaiAsPromised);

describe('/services/productService', () => {
  beforeEach(() => sinon.restore());

  describe('getAll', () => {
    it('deve retornar undefined caso o model não ache produtos', async () => {
      sinon.stub(productModel, 'getAll').resolves(undefined);

      const response = await productService.getAll();

      expect(response).to.be.undefined;
    });
    it('deve retornar uma lista com os produtos', async () => {
      const productsList = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ]
      sinon.stub(productModel, 'getAll').resolves(productsList);

      const response = await productService.getAll();

      expect(response).to.deep.equal(productsList);
    });
  });


  describe('checkIfListOfProductsExists', () => {
    it('deve retornar nada caso todos os produtos existam', async () => {
      sinon.stub(productModel, 'exists').resolves(true);
      const productsExists = await productService.checkIfListOfProductsExists([{ productId: 1, quantity: 10 }]);

      expect(productsExists).to.be.undefined;
    });
    it('deve disparar um erro caso algum produto não exista', () => {
      sinon.stub(productModel, 'exists').resolves(false);

      return expect(productService.checkIfListOfProductsExists([{}])).to.eventually.throw;
    })
  });

  describe('exists', () => {
    it('deve disparar um erro caso o model não ache o produto', () => {
      sinon.stub(productModel, 'exists').resolves(false);

      return expect(productService.exists()).to.eventually.throw;
    });
    it('deve retornar nada caso o model ache o produto', async () => {
      sinon.stub(productModel, 'exists').resolves(true);

      const response = await productService.exists();

      expect(response).to.be.undefined;
    });
  });

  describe('getById', () => {
    it('deve retornar undefined caso o model não ache o produto', async () => {
      sinon.stub(productModel, 'getById').returns(undefined);

      const response = await productService.getById(999);

      expect(response).to.be.undefined
    });
    it('deve retornar o objeto do produto caso o model ache o produto', async () => {
      sinon.stub(productModel, 'getById').returns({ id: 1, name: 'Martelo de Thor' });

      const response = await productService.getById(1);

      expect(response).to.deep.equal({ id: 1, name: 'Martelo de Thor' });
    });
  });


  describe('insertNew', () => {
    it('deve retornar um objeto com a chave id undefined caso o model não conseguir adicionar o produto', async () => {
      sinon.stub(productModel, 'insertNew').returns(undefined);

      const response = await productService.insertNew({});

      expect(response.id).to.be.undefined
    });
    it('deve retornar o objeto com id e nome do novo produto caso o model adicionar o produto', async () => {
      sinon.stub(productModel, 'insertNew').returns(1);

      const response = await productService.insertNew({ name: 'product' });

      expect(response).to.deep.equal({ id: 1, name: 'product' });
    });
  });
  describe('update', () => {
    it('deve retornar um obejto com o id e as alteração feitas no produto', async () => {
      sinon.stub(productModel, 'update').resolves;

      const response = await productService.update({ name: 'a' }, 1);

      expect(response).to.deep.equal({ name: 'a', id: 1 });
    });
  });

  describe('delete', () => {
    it('não deve retornar nada', async () => {
      sinon.stub(productModel, 'delete').resolves;

      const response = await productService.delete(1);

      expect(response).to.be.undefined
    });
  });
});
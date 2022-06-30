const { expect } = require('chai');
const sinon = require('sinon');
const saleController = require('../../../controllers/saleController');
const saleService = require('../../../services/saleService');

describe('controllers/saleController', () => {
  beforeEach(sinon.restore);

  describe('makeNewSale', () => {
    it('deve retornar o status 201 e o objeto com os dados da venda caso todas as validações passem e o service consiga adicionar a venda', async () => {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const saleData = {
        "id": 3,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 1
          },
        ]
      };

      sinon.stub(saleService, 'checkIfProductsExists').resolves(true);
      sinon.stub(saleService, 'validateNewSale').resolves();
      sinon.stub(saleService, 'makeNewSale').resolves(saleData);
      

      await saleController.makeNewSale(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(saleData)).to.be.true;
    });

    it('deve retornar o status 404 e a mensagem "Product not found" caso a validação dos ids dos produtos não passe', async () => {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const productNotFoundMessage = { message: 'Product not found' };

      sinon.stub(saleService, 'checkIfProductsExists').resolves(false);
      sinon.stub(saleService, 'validateNewSale').resolves();
      sinon.stub(saleService, 'makeNewSale').resolves();


      await saleController.makeNewSale(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(productNotFoundMessage)).to.be.true;
    })
  });

  
});
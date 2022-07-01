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
    });
  });

  describe('getAll', () => {
    it('deve retornar o status 200 e uma lista com todas as vendas', async () => {
      const salesList = [
        {
          "saleId": 1,
          "date": "2022-06-30T22:50:18.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "saleId": 1,
          "date": "2022-06-30T22:50:18.000Z",
          "productId": 2,
          "quantity": 10
        },
        {
          "saleId": 2,
          "date": "2022-06-30T22:50:18.000Z",
          "productId": 3,
          "quantity": 15
        }
      ];

      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'getAll').resolves(salesList);

      await saleController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(salesList)).to.be.true;
    });
  });

  describe('getById', () => {
    it('deve retornar o status 200 e uma lista com todas as vendas com o id selecionado caso a validação do id no service passe', async () => {
      const salesList = [
        {
          "saleId": 1,
          "date": "2022-06-30T22:50:18.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "saleId": 1,
          "date": "2022-06-30T22:50:18.000Z",
          "productId": 2,
          "quantity": 10
        },
      ];

      const req = {};
      const res = {};
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'getById').resolves(salesList);
      sinon.stub(saleService, 'exists').resolves(true);

      await saleController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(salesList)).to.be.true;
    });

    it('deve retornar o status 404 e a mensagem "Sale not found" caso a validação do id no service não passe', async () => {
      const saleNotFoundMessage = { message: 'Sale not found' };
      const req = {};
      const res = {};
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'exists').resolves(false);

      await saleController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(saleNotFoundMessage)).to.be.true;
    });
  });
  
});
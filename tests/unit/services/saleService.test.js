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
  
  describe('exists', () => {
    it('deve retornar nada quando o service encontrar a venda', async () => {
      sinon.stub(saleModel, 'exists').resolves(true);

      const saleExists = await saleService.exists(1);

      expect(saleExists).to.be.undefined;
    });
    it('deve disparar um erro quando o service não encontrar a venda', async () => {
      sinon.stub(saleModel, 'exists').resolves(false);

      expect(async () => await saleService.exists(111)).to.throw;
    });
  });

  describe('getById', () => {
    it('deve retornar undefined se o model não retornar as vendas', async () => {
      sinon.stub(saleModel, 'getById').resolves(undefined);

      const sale = await saleService.getById(111);

      expect(sale).to.be.undefined;
    });
    it('deve retornar a lista que o model retornar com as vendas', async () => {
      const salesList = [
        {
          "date": "2022-06-30T22:50:18.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "date": "2022-06-30T22:50:18.000Z",
          "productId": 2,
          "quantity": 10
        }
      ];

      sinon.stub(saleModel, 'getById').resolves(salesList);

      const sale = await saleService.getById(1);

      expect(sale).to.deep.equal(salesList);
    });
  });

  describe('getAll', () => {
    it('deve retornar undefined quando o model não retornar as venda', async () => {
      sinon.stub(saleModel, 'getAll').resolves(undefined);

      const sale = await saleService.getAll();

      expect(sale).to.be.undefined;
    });
    it('deve retornar um array com as vendas', async () => {
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
      ]

      sinon.stub(saleModel, 'getAll').resolves(salesList);

      const sale = await saleService.getAll(1);

      expect(sale).to.deep.equal(salesList);
    });
  });
});
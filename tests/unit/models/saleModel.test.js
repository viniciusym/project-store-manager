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
    it('deve retornar undefined os produtos da venda não for adicionada no DB', async () => {
      sinon.stub(connection, 'query').resolves([{}]);

      const productsSaleResponse = await saleModel.insertNewSaleProducts();

      expect(productsSaleResponse).to.be.undefined;
    });
    it('deve retornar undefined a venda não for adicionada no DB', async () => {
      sinon.stub(connection, 'query').resolves([{ affectedRows: 1}]);

      const productsSaleResponse = await saleModel.insertNewSaleProducts([1, 2, 3 ]);

      expect(productsSaleResponse).to.be.equal(1);
    });
  });

  describe('exists', () => {
    it('deve retornar false quando não encontrar o id da venda no DB', async () => {
      sinon.stub(connection, 'query').resolves([[]]);

      const saleExists = await saleModel.exists(111);

      expect(saleExists).to.be.false;
    });
    it('deve retornar true quando encontrar o id da venda no DB', async () => {
      sinon.stub(connection, 'query').resolves([[1]]);

      const saleExists = await saleModel.exists(1);

      expect(saleExists).to.be.true;
    });
  });

  describe('getById', () => {
    it('deve retornar undefined quando o DB não retornar a venda', async () => {
      sinon.stub(connection, 'query').resolves([]);

      const sale = await saleModel.getById(111);

      expect(sale).to.be.undefined;
    });
    it('deve retornar um array com as vendas', async () => {
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
      
      sinon.stub(connection, 'query').resolves([salesList]);

      const sale = await saleModel.getById(1);

      expect(sale).to.deep.equal(salesList);
    });
  });

  describe('getAll', () => {
    it('deve retornar undefined quando o DB não retornar a venda', async () => {
      sinon.stub(connection, 'query').resolves([]);

      const sale = await saleModel.getAll();

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

      sinon.stub(connection, 'query').resolves([salesList]);

      const sale = await saleModel.getAll(1);

      expect(sale).to.deep.equal(salesList);
    });
  });
})
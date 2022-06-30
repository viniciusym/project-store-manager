const connection = require('./db');

const saleModel = {
  async insertNewSale() {
    const sql = 'insert into StoreManager.sales(date) values (now())';
    const [{ insertId }] = await connection.query(sql);
    return insertId;
  },
  async insertNewSaleProducts(products) {
    const sql = 'insert into StoreManager.sales_products(product_id, quantity, sale_id) values ?';
    const response = await connection.query(sql, [products]); 
    return response;
  },
};

module.exports = saleModel;
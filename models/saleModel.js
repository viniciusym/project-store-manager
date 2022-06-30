const connection = require('./db');

const saleModel = {
  async insertNewSale() {
    const sql = 'insert into StoreManager.sales(date) values (now())';
    const [{ insertId }] = await connection.query(sql);
    return insertId;
  },
  async exists(id) {
    const sql = `
    select date, product_id as productId, quantity from StoreManager.sales as a
    join StoreManager.sales_products as sl on sl.sale_id = a.id where a.id = ?`;
    const [[sales]] = await connection.query(sql, [id]);
    return !!sales;
  },
  async insertNewSaleProducts(products) {
    const sql = 'insert into StoreManager.sales_products(product_id, quantity, sale_id) values ?';
    const [{ affectedRows }] = await connection.query(sql, [products]); 
    return affectedRows;
  },
  async getById(id) {
    const sql = `
    select date, product_id as productId, quantity from StoreManager.sales as a
    join StoreManager.sales_products as sl on sl.sale_id = a.id where a.id = ?`;
    const [sales] = await connection.query(sql, [id]);
    return sales;
  },
  async getAll() {
    const sql = `
    select id as saleId, date, product_id as productId, quantity from StoreManager.sales as a
    join StoreManager.sales_products as sl on sl.sale_id = a.id`;
    const [sales] = await connection.query(sql);
    return sales;
  },
};

module.exports = saleModel;
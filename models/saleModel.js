const connection = require('./db');

const saleModel = {
  async insertNewSale() {
    const sql = 'insert into StoreManager.sales(date) values (now())';
    const [{ insertId }] = await connection.query(sql);
    return insertId;
  },
  async exists(id) {
    const sql = `
    select 1 from StoreManager.sales where id = ?`;
    const [[sales]] = await connection.query(sql, [id]);
    return !!sales;
  },
  async insertNewSaleProducts(products) {
    const sql = 'insert into StoreManager.sales_products(product_id, quantity, sale_id) values ?';
    const [{ affectedRows }] = await connection.query(sql, [products]); 
    return affectedRows;
  },
  async update(saleChanges, id, oldSale) {
    const sql = `
    update StoreManager.sales_products set ? where sale_id = ? and product_id = ? and quantity = ?`;
    const response = await connection.query(sql, [saleChanges, id, ...oldSale]);
    return response;
  },
  async getById(id) {
    const sql = `
    select date, product_id as productId, quantity from StoreManager.sales as a
    join StoreManager.sales_products as sl on sl.sale_id = a.id where a.id = ?`;
    const [sales] = await connection.query(sql, [id]);
    return sales;
  },
  async getSalesForUpdate(id) {
    const sql = `
    select product_id, quantity from StoreManager.sales as a
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
  async delete(id) {
    const sql = 'delete from StoreManager.sales where id = ?';
    await connection.query(sql, [id]);
  },
};

module.exports = saleModel;
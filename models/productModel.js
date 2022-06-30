const connection = require('./db');

const productModel = {
  async getAll() {
    const sql = 'select * from StoreManager.products';
    const [products] = await connection.query(sql);
    return products;
  },
  async getById(id) {
    const sql = 'select * from StoreManager.products where id = ?';
    const [[product]] = await connection.query(sql, [id]);
    return product;
  },
  async exists(id) {
    const sql = 'select * from StoreManager.products where id = ?';
    const [[product]] = await connection.query(sql, [id]);
    return !!product;
  },
  async insertNew(product) {
    const sql = 'insert into StoreManager.products set ?';
    const [{ insertId }] = await connection.query(sql, [product]);
    return insertId;
  },
};

module.exports = productModel;

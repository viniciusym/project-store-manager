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
};

module.exports = productModel;

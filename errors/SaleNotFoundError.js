class SaleNotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = 'SaleNotFoundError';
    this.status = 404;
  }
}

module.exports = SaleNotFoundError;
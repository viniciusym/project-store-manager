class SaleNotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = 'SaleNotFoundError';
  }
}

module.exports = SaleNotFoundError;
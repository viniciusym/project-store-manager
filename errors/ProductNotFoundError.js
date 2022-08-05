class ProductNotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = 'ProductNotFoundError';
    this.status = 404;
  }
}

module.exports = ProductNotFoundError;
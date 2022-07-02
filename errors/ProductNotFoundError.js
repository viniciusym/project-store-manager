class ProductNotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = 'ProductNotFoundError';
  }
}

module.exports = ProductNotFoundError;
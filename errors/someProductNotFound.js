class someProductNotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = someProductNotFoundError;
  }
}

module.exports = someProductNotFoundError;
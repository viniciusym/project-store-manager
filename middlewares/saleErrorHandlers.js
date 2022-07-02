module.exports = [
  (err, _req, res, next) => {
    const { message } = err;
    const regexProductId = /.+?\.productId/;
    const regexQuantity = /.+?\.quantity/;
    switch (true) {
      case regexProductId.test(message):
        res.status(400).json({ message: '"productId" is required' });
        break;
      case regexQuantity.test(message) && message.includes('greater'):
        res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
        break;
      case regexQuantity.test(message):
        res.status(400).json({ message: '"quantity" is required' });
        break;
      default:
        next(err);
    }
  },
  (err, _req, res, next) => {
    const { name, message } = err;
    switch (name) {
      case 'SaleNotFoundError':
        res.status(404).json({ message });
        break;
      case 'ProductNotFoundError':
        res.status(404).json({ message });
        break;
      default:
        next(err);
    }
  },
];
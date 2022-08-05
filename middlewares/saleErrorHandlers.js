module.exports = (err, _req, res, _next) => {
  const { message, status } = err;
  const regexProductId = /.+?\.productId/;
  const regexQuantity = /.+?\.quantity/;
  if (status) return res.status(status).message({ message });
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
      res.status(500).json({ message });
  }
};

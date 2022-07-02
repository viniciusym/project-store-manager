const express = require('express');
const productRoute = require('./routes/productRoute');
const saleRoute = require('./routes/saleRoute');

const app = express();

app.use(express.json());
app.use('/products', productRoute);
app.use('/sales', saleRoute);

app.use((err, _req, res, _next) => {
  const { message } = err;
  switch (message) {
    case 'Product not found':
      res.status(404).json({ message });
      break;
    case '"name" is required':
      res.status(400).json({ message });
      break;
    case '"name" length must be at least 5 characters long':
      res.status(422).json({ message });
      break;
    default:
      res.status(500).json(err);
      break;
  }
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
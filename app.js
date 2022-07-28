const express = require('express');
const productRoute = require('./routes/productRoute');
const saleRoute = require('./routes/saleRoute');

const app = express();

app.use(express.json());
app.use('/products', productRoute);
app.use('/sales', saleRoute);

module.exports = app;
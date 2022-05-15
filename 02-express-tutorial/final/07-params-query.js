const express = require('express');
const app = express();

const {products, people} = require('./data');

app.get('/', (req, res) => {
  res.send('<h1>Home</h1><a href="/api/products">products</a>');
});

app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const {id, name, image} = product;

    return {id, name, image};
  });
  res.json(newProducts);
});

app.get('/api/products/:productID', (req, res) => {
  const {productID} = req.params;
  const singleProducts = products.find(
    (product) => product.id === Number(productID)
  );
  if (!singleProducts) {
    return res.status(404).send('not found');
  }
  return res.json(singleProducts);
});

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
  res.send('heelo');
});

app.get('/api/v1/query', (req, res) => {
  // /api/v1/query?name=rivan&id=1
  const {search, limit} = req.query;
  let sortedProducts = [...products];
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (sortedProducts.length < 1) {
    return res.status(200).json({success: true, data: []});
  }
  res.status(200).json(sortedProducts);
});

app.listen(4000);

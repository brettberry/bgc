const data = require('./src/data');
const fetch = require('isomorphic-fetch');

data.products.forEach(product => {
  fetch('http://localhost:3000/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });
});

'use strict';

const fs = require('fs');
const fetch = require('isomorphic-fetch');
const AWS = require('aws-sdk');
const _ = require('lodash');
const data = require('./src/data');

const config = new AWS.Config({
  accessKeyId: 'AKIAJN63MCTNTA4I4P3A',
  secretAccessKey: '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',
  region: 'us-west-2'
});

const s3 = new AWS.S3(config);

data.products.forEach(async product => {

  // 1. Create product in db
  const res = await fetch('http://localhost:3000/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });
  const json = await res.json();

  // 2. Upload images to amazon
  product.media.forEach(async media => {
    const match = media.match(/^url\((.*)\)$/i);
    const path = `./public${match[1]}`;
    const parts = path.split('/');
    const key = _.last(parts);

    const stream = fs.createReadStream(path);
    const params = {
      Bucket: 'images.berrygamecalls',
      Key: key,
      Body: stream,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    };

    s3.putObject(params, error => {
      if (error) {
        return console.error(error);
      }
    });

    // 3. Create media in db
    // Post to http://localhost:3000/products/id/media

    await fetch(`http://localhost:3000/products/${json.id}/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: `https://s3-us-west-2.amazonaws.com/images.berrygamecalls/${key}`
      })
    });
  });
});

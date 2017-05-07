import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';

import { API_URL } from './constants';

export function fetchProductByPathName(pathName) {
  return Promise.resolve()
    .then(() => fetch(`${API_URL}/products/${pathName}`))
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      else {
        throw new Error('Failed to fetch product');
      }
    });
}

export function fetchProductsByCategory(category) {
  return Promise.resolve()
    .then(() => fetch(`${API_URL}/products?category=${category}`))
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error('Failed to fetch products');
      }
    });
}

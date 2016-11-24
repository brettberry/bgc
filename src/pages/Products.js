import React, { Component } from 'react';
import './products.styles.scss';
import data from '../data.json';
import { ProductCollection } from '../models';
import map from 'lodash/map';
import classnames from 'classnames';
import Sidebar from '../Sidebar';
import { Link } from 'react-router';

const products = new ProductCollection(data.products);

export default class Products extends Component {
  render() {
    const bugles = products.filterByCategory('bugles');
    const reeds = products.filterByCategory('reeds');
    const goldenDome = products.filterByCategory('golden-dome');
    const xSeries = products.filterByCategory('x-series');
    const bigBull = products.filterByCategory('big-bull');
    const cowCalls = products.filterByCategory('cow-calls');
    const dvds = products.filterByCategory('dvds');
    const other = products.filterByCategory('other');
    const sale = products.filterByCategory('sale');
    const popular = products.filterByCategory('popular');
    return (
      <div>
        <Sidebar />
        <div className="grid">{map(products.toArray(), (product, key) =>
          <ProductGrid product={product} key={key} />
        )}
        </div>
      </div>
    );
  }
}

function ProductGrid({ product, key }) {
  const name = product.getFullName();
  const price = product.getPrice().getAmount();
  const discount = product.getPrice().getDiscount();
  const showDiscount = !!discount;
  return (
    <div className="gridContainer">
      <Link key={key} to={`/products/${product.getCategory()}/${product.getPathName()}`} className="gridLink">
          <div className="gridBox">
            <h3 className="title">{name}</h3>
            <div className="priceContainer">
              <p className={classnames('price', showDiscount && 'strike')}>${price}</p>
              { showDiscount && <p className="discount">${discount}</p>}
            </div>
          </div>
      </Link>
    </div>
  );
}

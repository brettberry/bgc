import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import data from '../data.json';
import { ProductCollection } from '../models';
import map from 'lodash/map';
import classnames from 'classnames';
import { Link } from 'react-router';

const products = new ProductCollection(data.products);

class Tags extends Component {
  render() {
    const tagName = this.props.routeParams.tagName;
    const productName = products.filterByTag(tagName);
    return (
      <div>
        <Sidebar />
        <div className="grid">{map(productName.toArray(), (product, key) =>
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

export default Tags;

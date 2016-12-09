import React, { Component } from 'react';
import { Link } from 'react-router';
import map from 'lodash/map';
import classnames from 'classnames';
import data from './data.json';
import { ProductCollection } from './models';
import Button from './Buttons';
import './productFeature.styles.scss';

const products = new ProductCollection(data.products);

class Featured extends Component {
  render() {
    const featured = products.filterByTag('featured');
    return (
      <div>
        <div className="bannerContainer">
          <h2 className="header2">Sound like the real thing.</h2>
          <Link to="/products" className="viewLink">
            <Button text="view all" className="viewAllButton" />
          </Link>
        </div>
        <div className="featured">
          {map(featured.toArray(), (feature, key) =>
            <FeaturedItem feature={feature} key={key} />
          )}
        </div>
      </div>
    );
  }
}

function FeaturedItem({ feature, key }) {
  const price = feature.getPrice().getAmount();
  const discount = feature.getPrice().getDiscount();
  const showDiscount = !!discount;
  const priceClasses = classnames('price', showDiscount && 'strike');
  return (
    <div className="featuredContainer">
      <Link key={key} to={`/products/${feature.getCategory()}/${feature.getPathName()}`} className="link">
        <div className="featuredDiv">
          <h3 className="title">{feature.getFullName()}</h3>
          <div className="priceContainer">
            <p className={priceClasses}>${price}</p>
            {showDiscount && <p className="discount">${discount}</p>}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Featured;

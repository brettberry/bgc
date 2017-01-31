import React, { Component, PropTypes } from 'react';
import ProductModel from './models/ProductModel';
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
        <div className="productBannerContainer">
          <h2 className="header">Sound like the real thing.</h2>
          <Link to="/products" className="viewLink">
            <Button text="view all" className="viewAllButton" />
          </Link>
        </div>
        <div className="featured">
          {map(featured.toArray(), (feature, key) =>
            <FeaturedItem feature={feature} key={key} />
          )}
          <h2 className="header">Proud to be</h2>
          <h2 className="header highlight">&nbsp;Made in the USA.</h2>
        </div>
      </div>
    );
  }
}


class FeaturedItem extends Component {

  static propTypes = {
    feature: PropTypes.instanceOf(ProductModel),
    key: PropTypes.number
  }

  getBackgroundImage(myProduct) {
    const images = myProduct.getMedia();
    return {
      backgroundImage: images[0]
    };
  }

  render() {
    const feature = this.props.feature;
    const key = this.props.key;
    const price = feature.getPrice().getAmount().toFixed(2);
    const discount = feature.getPrice().getDiscount() && feature.getPrice().getDiscount().toFixed(2);
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
            <div className="productImgContainer">
              <div className="productImage" style={this.getBackgroundImage(feature)} />
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default Featured;

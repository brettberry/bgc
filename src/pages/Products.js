import React, { Component, PropTypes } from 'react';
import './products.styles.scss';
import data from '../data.json';
import { ProductCollection } from '../models';
import map from 'lodash/map';
import classnames from 'classnames';
import Sidebar from '../Sidebar';
import { Link } from 'react-router';
import TabletProvider from '../TabletProvider';

const products = new ProductCollection(data.products);

export default class Products extends Component {
  render() {
    return (
      <div className="productsContainer">
        <TabletProvider>
          <SubMenuRenderer />
        </TabletProvider>
        <div className="productGrid">{map(products.toArray(), (product, key) =>
          <ProductGrid product={product} key={key} />)}
        </div>
      </div>
    );
  }
}

function ProductGrid({ product, key }) {
  const name = product.getFullName();
  const price = product.getPrice().getAmount().toFixed(2);
  const discount = product.getPrice().getDiscount() && product.getPrice().getDiscount().toFixed(2);
  const showDiscount = !!discount;
  const sampleImage = 'url(/samplePhotos/flower.jpg)';

  return (
    <div className="container">
      <Link key={key} to={`/products/${product.getCategory()}/${product.getPathName()}`} className="link">
          <div className="product">
            <h3 className="title">{name}</h3>
            <div className="priceContainer">
              <p className={classnames('price', showDiscount && 'strike')}>${price}</p>
              { showDiscount && <p className="discount">${discount}</p>}
            </div>
            <div className="productImgContainer">
              <div className="productImage" style={{ backgroundImage: sampleImage }} />
            </div>
          </div>
      </Link>
    </div>
  );
}

class SubMenuRenderer extends Component {

  static propTypes = {
    isTablet: PropTypes.bool
  }

  static defaultProps = {
    isTablet: false
  }

  render() {
    return this.props.isTablet ? this.renderTablet() : this.renderDesktop();
  }

  renderTablet() {
    return (
      <div />
    );
  }

  renderDesktop() {
    return (
      <div>
        <Sidebar />
      </div>
    );
  }
}

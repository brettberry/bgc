import React, { Component, PropTypes } from 'react';
import QuantityPicker from '../QuantityPicker';
import Button from '../Buttons';
import './product.styles.scss';
import data from '../data.json';
import { ProductCollection } from '../models';
import classnames from 'classnames';
import map from 'lodash/map';

const products = new ProductCollection(data.products);

export default class Product extends Component {
  render() {
    const pathName = this.props.routeParams.productName;
    const product = products.findByPathName(pathName);
    return (
      <div>
        <ProductView product={product} />
        <RelatedProducts product={product} />
      </div>
    );
  }
}

function ProductView({ product }) {
  const productName = product.getFullName();
  const price = product.getPrice().getAmount();
  const discount = product.getPrice().getDiscount();
  const showDiscount = !!discount;
  return (
    <div className="productView">
      <div className="productContainer">
        <h1 className="largeProductName">{productName}</h1>
        <div className="imgContainer">
          <div className="thumbnailsContainer">
            <div className="thumbnail"></div>
            <div className="thumbnail"></div>
            <div className="thumbnail"></div>
          </div>
          <div className="imgDivLarge"></div>
          <div className="orderDiv">
            <div className="priceContainer">
              <h2 className={classnames('priceHeader', showDiscount && 'strike')}>${price}</h2>
              {showDiscount && <h2 className="discountHeader">${discount}</h2>}
            </div>
            <h3 className="priceSubHeader">+ Flatrate shipping: $2.95</h3>
            <div className="buttonPickerContainer">
              <QuantityPicker />
              <Button text="Add To Cart" />
            </div>
            <div className="descriptionContainer">
              <h3 className="descriptionHeader">Description</h3>
              <p className="itemDescription">{product.getDescription()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RelatedProducts({ product }) {
  const category = product.getCategory();
  const items = products.filterByCategory(category);
  return (
    <div className="relatedProductsContainer">
      <h2 className="priceSubHeader">Related Items</h2>
      <div className="relatedInnerDiv">{map(items.toArray(), (item, key) =>
        <div className="relatedItem">
          <h3>{item.getFullName()}</h3>
        </div>
      )}
      </div>
    </div>
  );
}

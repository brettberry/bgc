import React, { Component, PropTypes } from 'react';
import QuantityPicker from '../QuantityPicker';
import Button from '../Buttons';
import './product.styles.scss';
import data from '../data.json';
import { ProductCollection } from '../models';

const products = new ProductCollection(data.products);

export default class Product extends Component {
  render() {
    const pathName = this.props.routeParams.productName;
    const product = products.findByPathName(pathName);
    return (
      <div>
        <ProductView product={product} />
        <RelatedProducts />
      </div>
    );
  }
}

function ProductView({ product }) {
  return (
    <div className="productView">
      <div className="productContainer">
        <h1 className="largeProductName">{product.getFullName()}</h1>
        <div className="imgContainer">
          <div className="thumbnailsContainer">
            <div className="thumbnail"></div>
            <div className="thumbnail"></div>
            <div className="thumbnail"></div>
          </div>
          <div className="imgDivLarge"></div>
          <div className="orderDiv">
            <h2 className="priceHeader">${product.getPrice().getAmount()}</h2>
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

function RelatedProducts() {
  return (
    <div className="relatedProductsContainer">
      <h2 className="priceSubHeader">Related Items</h2>
      <div className="relatedInnerDiv">
        <div className="relatedItem"></div>
        <div className="relatedItem"></div>
        <div className="relatedItem"></div>
        <div className="relatedItem"></div>
      </div>
    </div>
  );
}

import React, { Component } from 'react';
import QuantityPicker from '../QuantityPicker';
import Button from '../Buttons';
import './product.styles.scss';

export default class Product extends Component {
  render() {
    return (
      <div>
        <ProductView />
        <RelatedProducts />
      </div>
    );
  }
}

function ProductView() {
  return (
    <div className="productView">
      <div className="productContainer">
        <h1 className="largeProductName">The Original Berry Thunder Bugle</h1>
        <div className="imgContainer">
          <div className="thumbnailsContainer">
            <div className="thumbnail"></div>
            <div className="thumbnail"></div>
            <div className="thumbnail"></div>
          </div>
          <div className="imgDivLarge"></div>
          <div className="orderDiv">
            <h2 className="priceHeader">$34.50</h2>
            <h3 className="priceSubHeader">+ Flatrate shipping: $2.95</h3>
            <div className="buttonPickerContainer">
              <QuantityPicker />
              <Button text="Add To Cart" />
            </div>
            <div className="descriptionContainer">
              <h3 className="descriptionHeader">Description</h3>
              <p className="itemDescription">The revolutionary Thunder Bugle is one of the best external elk calls ever made. The thin replaceable RT-Reeds snap into the mouthpiece in seconds.  With four different types of RT-Reeds you can produce a variety of sounds quickly.  Simply blow a breath of air through the call and apply top lip, bottom lip, or even tongue pressure and you will be producing tones so easily.  With a little practice you will be sounding like the real thing in no time.  The Thunder Bugle comes with two RT-Reeds, a camo cover, and a cap to protect the reed.</p>
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

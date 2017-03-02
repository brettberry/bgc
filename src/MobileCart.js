import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import map from 'lodash/map';
import FaClose from 'react-icons/lib/fa/close';

import CartItemCollection from './models/CartItemCollection';
import QuantityPicker from './QuantityPicker';
import Button from './Buttons';
import './mobileCart.styles.scss';

class MobileCart extends Component {

  static contextTypes = {
    cart: PropTypes.instanceOf(CartItemCollection),
    updateCartItem: PropTypes.func,
    removeCartItem: PropTypes.func
  }

  getThumbnailImage(item) {
    const productImg = item.getMedia();
    return { backgroundImage: productImg[0] };
  }

  render() {
    return (
      <div>
        <div className="mobileBorder">
          <div className="table">
            <div className="tableBody">
              <div className="cartItems">
                {map(this.context.cart.toArray(), this.renderCartItem.bind(this))}
              </div>
            </div>
            <div className="mobileTotalContainer">
              <h2 className="totalLabel">Cart Total:&nbsp;</h2>
              <h2 className="subtotal">${ this.context.cart.getCartTotal().toFixed(2)}</h2>
            </div>
          </div>
        </div>
        <Link to={'/account/checkout'} className="mobileCheckoutLink">
          <Button text="Checkout" className="mobileCheckoutButton"/>
        </Link>
        <Link to="/products" className="shopLink">
          <p className="continue">continue shopping</p>
        </Link>
      </div>
    );
  }

  renderCartItem(item, index) {
    return (
      <div key={index} className="mobileCartContainer">
        <Link className="mobileItemLink"
              to={`/products/${item.getProduct().getCategory()}/${item.getProduct().getPathName()}`}>
          <div className="item">
            <div className="thumbnailImage" style={this.getThumbnailImage(item)}/>
            <div className="productDetails">
              <div className="name">{item.getFullName()}</div>
              <div className="mobileUnitPrice">${(item.getSubtotal() / item.getQuantity()).toFixed(2)} each</div>
            </div>
            <div className="mobileItemTotal">{`$${item.getSubtotal().toFixed(2)}`}</div>
          </div>
        </Link>
        <div className="changeContents">
          <div className="mobileQuantityContainer">
            <h3 className="qtyText">Change Quantity</h3>
            <QuantityPicker initialQuanity={item.getQuantity()}
                            onQuantityChange={quantity => this.context.updateCartItem(item, quantity)}/>
          </div>
          <div className="mobileRemoveContainer">
            <h3 className="removeText"
                onClick={() => this.context.removeCartItem(item)}>Remove Item</h3>
            <FaClose className="remove"
                     onClick={() => this.context.removeCartItem(item)}/>
          </div>
        </div>
        <div className="mobileHorizontalRule" />
      </div>
    );
  }
}

export default MobileCart;

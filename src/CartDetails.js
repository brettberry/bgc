import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import map from 'lodash/map';
import FaClose from 'react-icons/lib/fa/close';

import CartItemCollection from './models/CartItemCollection';
import QuantityPicker from './QuantityPicker';
import Button from './Buttons';
import './pages/cart.styles.scss';

class CartDetails extends Component {

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
        <div className="border">
          <div className="table">
            <div className="headingContainer">
              <div className="itemDescriptionHeader">Item</div>
              <div className="itemHeader">Price</div>
              <div className="itemHeader">Quantity</div>
              <div className="itemHeader">Total</div>
              <div className="itemHeader removeTitle">Remove</div>
            </div>
            <div className="horizontalRule" />
            <div className="tableBody">
              <div className="cartItems">
                {map(this.context.cart.toArray(), this.renderCartItem.bind(this))}
              </div>
            </div>
            <div className="horizontalRule" />
            <div className="cartTotalContainer">
              <h2 className="cartTotalLabel">Subtotal:&nbsp;</h2>
              <h2 className="cartSubtotal">${ this.context.cart.getCartTotal().toFixed(2)}</h2>
            </div>
          </div>
        </div>
        <Link to={'/account/checkout'} className="checkoutLink">
          <Button text="Checkout" className="cartButton" />
        </Link>
        <Link to="/products" className="shopLink">
          <p className="continue">continue shopping</p>
        </Link>
      </div>
    );
  }

  renderCartItem(item, index) {
    return (
      <div key={index} className="cartItemContainer">
        <Link className="link"
              to={`/products/${item.getProduct().getCategory()}/${item.getProduct().getPathName()}`}>
          <div className="itemDescription">
            <div className="thumbnailImageDiv" style={this.getThumbnailImage(item)} />
            <div className="item">{item.getFullName()}</div>
          </div>
        </Link>
        <div className="unitPrice">${(item.getSubtotal() / item.getQuantity()).toFixed(2)}</div>
        <div className="quantityContainer">
          <QuantityPicker initialQuanity={item.getQuantity()}
                          onQuantityChange={quantity => this.context.updateCartItem(item, quantity)} />
        </div>
        <div className="itemTotal">{`$${item.getSubtotal().toFixed(2)}`}</div>
        <div className="removeContainer">
          <FaClose className="remove"
                   onClick={() => this.context.removeCartItem(item)} />
        </div>
      </div>
    );
  }
}

export default CartDetails;

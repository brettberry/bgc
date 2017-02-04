import React, { Component, PropTypes } from 'react';
import CartItemCollection from '../models/CartItemCollection';
import CartDetails from '../CartDetails';
import './cart.styles.scss';

class Cart extends Component {

  static contextTypes = {
    cart: PropTypes.instanceOf(CartItemCollection)
  }

  render() {
    return (
      <div>
        <div className="cartHeaderContainer">
          <h1 className="cartHeader">Your Cart</h1>
          <div>{this.getCartContents()}</div>
        </div>
      </div>
    );
  }

  getCartContents() {
    if (this.context.cart.length !== 0) {
      return (
        <div>
          <CartDetails />
        </div>
      );
    }
    return (
      <div className="cartEmptyMsg">Your cart is currently empty.</div>
    );
  }
}

export default Cart;

import React, { Component, PropTypes } from 'react';
import CartItemCollection from '../models/CartItemCollection';
import CartDetails from '../CartDetails';
import CartRenderer from '../CartRenderer';
import TabletProvider from '../TabletProvider';
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
          <TabletProvider>
            <CartRenderer />
          </TabletProvider>
        </div>
      );
    }

    return (
      <div className="cartEmptyMsg">Your cart is currently empty.</div>
    );
  }
}

export default Cart;

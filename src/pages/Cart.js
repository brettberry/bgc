import React, { Component, PropTypes } from 'react';
import CartItemCollection from '~/models/CartItemCollection';
import CartRenderer from '~/renderers/CartRenderer';
import TabletProvider from '~/providers/TabletProvider';
import './cart.styles.scss';

class Cart extends Component {

  static contextTypes = {
    cart: PropTypes.instanceOf(CartItemCollection)
  }

  getCartContents() {
    if (this.context.cart.length !== 0) {
      return (
        <TabletProvider>
          <CartRenderer/>
        </TabletProvider>
      );
    }

    return (
      <div className="cartEmptyMsg">
        Your cart is currently empty.
      </div>
    );
  }

  render() {
    return (
      <div className="cartHeaderContainer">
        <h1 className="cartHeader">Your Cart</h1>
        <div>{this.getCartContents()}</div>
      </div>
    );
  }
}

export default Cart;

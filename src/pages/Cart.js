import React, { Component, PropTypes } from 'react';
import CartItemCollection from '../models/CartItemCollection';
import QuantityPicker from '../QuantityPicker';
import FaClose from 'react-icons/lib/fa/close';
import map from 'lodash/map';
import './cart.styles.scss';

class Cart extends Component {

  static contextTypes = {
    cart: PropTypes.instanceOf(CartItemCollection),
    updateCartItem: PropTypes.func,
    removeCartItem: PropTypes.func
  }

  render() {
    return (
      <div>
        {map(this.context.cart.toArray(), this.renderItem.bind(this))}
      </div>
    );
  }

  renderItem(item, index) {
    return (
      <div key={index} className="cartItemContainer">
        <div>{item.getFullName()}</div>
        <QuantityPicker initialQuanity={item.getQuantity()}
                        onQuantityChange={quantity => this.context.updateCartItem(item, quantity)} />
        <div>{item.getSubtotal().toFixed(2)}</div>
        <FaClose onClick={() => this.context.removeCartItem(item)} />
      </div>
    );
  }
}

export default Cart;

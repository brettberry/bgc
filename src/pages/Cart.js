import React, { Component, PropTypes } from 'react';
import CartItemCollection from '../models/CartItemCollection';
import { Link } from 'react-router';
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

  getThumbnailImage(item) {
      const productImg = item.getMedia();
      console.log(item.getProduct().toJS());
      return { backgroundImage: productImg[0] };
  }

  render() {
    return (
      <div>
        <div className="cartItems">
          {map(this.context.cart.toArray(), this.renderItem.bind(this))}
        </div>
        <div className="cartTotal">
          {this.context.cart.getCartTotal().toFixed(2)}
        </div>
        <Link to={'/checkout'}>
          <button>Checkout</button>
        </Link>
      </div>
    );
  }

  renderItem(item, index) {
    return (
      <div key={index} className="cartItemContainer">
        <div className="thumbnailImageDiv" style={this.getThumbnailImage(item)} />
        <div className="item">{item.getFullName()}</div>
        <div className="rightContents">
          <QuantityPicker initialQuanity={item.getQuantity()}
                          onQuantityChange={quantity => this.context.updateCartItem(item, quantity)} />
          <div className="itemTotal">{`$${item.getSubtotal().toFixed(2)}`}</div>
          <FaClose className="remove"
                   onClick={() => this.context.removeCartItem(item)} />
        </div>
      </div>
    );
  }
}

export default Cart;

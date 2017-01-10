import React, { Component, PropTypes } from 'react';
import CartItemCollection from '../models/CartItemCollection';
import { Link } from 'react-router';
import QuantityPicker from '../QuantityPicker';
import Button from '../Buttons';
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
      return { backgroundImage: productImg[0] };
  }

  render() {
    return (
      <div>
        <div className="cartHeaderContainer">
          <h1 className="cartHeader">Your Cart</h1>
        </div>
        <table className="table">
          <thead className="thead">
            <tr>
              <th className="itemDescriptionHeader">Item</th>
              <th className="itemHeader">Unit Price</th>
              <th className="itemHeader">Quantity</th>
              <th className="itemHeader">Subtotal</th>
              <th className="itemHeader removeTitle">Remove</th>
            </tr>
          </thead>
          <div className="horizontalRule" />
          <tbody className="tableBody">
            <tr className="cartItems">
              {map(this.context.cart.toArray(), this.renderItem.bind(this))}
            </tr>
          </tbody>
          <div className="horizontalRule" />
        </table>
        <div className="cartTotal">
          <h3 className="totalHeader">Total:</h3>
          <h3 className="totalHeader">${this.context.cart.getCartTotal().toFixed(2)}</h3>
        </div>
        <Link to={'/checkout'} className="checkoutLink">
          <Button text="Checkout" className="cartButton" />
        </Link>
      </div>
    );
  }

  renderItem(item, index) {
    return (
      <div key={index} className="cartItemContainer">
        <div className="itemDescription">
          <div className="thumbnailImageDiv" style={this.getThumbnailImage(item)} />
          <div className="item">{item.getFullName()}</div>
        </div>
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

export default Cart;

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
    cart: PropTypes.instanceOf(CartItemCollection)
  }
  render() {
    return (
      <div>
        <div className="cartHeaderContainer">
          <h1 className="cartHeader">Your Cart</h1>
        </div>
        <div className="border">
          <CartDetails />
          <div className="horizontalRule" />
          <div className="cartTotalContainer">
            <h2 className="cartTotalLabel">Subtotal:&nbsp;</h2>
            <h2 className="cartSubtotal">${ this.context.cart.getCartTotal().toFixed(2)}</h2>
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
}

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
      <table className="table">
        <thead className="thead">
          <tr>
            <th className="itemDescriptionHeader">Item</th>
            <th className="itemHeader">Unit Price</th>
            <th className="itemHeader">Quantity</th>
            <th className="itemHeader">Item Subtotal</th>
            <th className="itemHeader removeTitle">Remove</th>
          </tr>
        </thead>
        <div className="horizontalRule" />
        <tbody className="tableBody">
          <tr className="cartItems">
            {map(this.context.cart.toArray(), this.renderCartItem.bind(this))}
          </tr>
        </tbody>
      </table>
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

export default Cart;

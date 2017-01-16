import React, { Component, PropTypes } from 'react';
import CartItemCollection from '../models/CartItemCollection';
import { Link } from 'react-router';
import QuantityPicker from '../QuantityPicker';
import Button from '../Buttons';
import FaClose from 'react-icons/lib/fa/close';
import map from 'lodash/map';
import './cart.styles.scss';

class Cart extends Component {
  render() {
    return (
      <div>
        <div className="cartHeaderContainer">
          <h1 className="cartHeader">Your Cart</h1>
        </div>
        <CartDetails />
        <OrderSummary />
        <Link to={'/checkout'} className="checkoutLink">
          <Button text="Checkout" className="cartButton" />
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
            <th className="itemHeader">Subtotal</th>
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

class OrderSummary extends Component {

  static contextTypes = {
    cart: PropTypes.instanceOf(CartItemCollection)
  }

  render() {
    const cart = this.context.cart;
    return (
      <div className="orderSummary">
        <div className="totalContainer">
          <div className="cartTotal">
            <p className="item">Subtotal</p>
            <p className="itemValue">${cart.getCartTotal().toFixed(2)}</p>
          </div>
          <div className="cartTotal">
            <p className="item">Tax</p>
            <p className="itemValue">$0.00</p>
          </div>
          <div className="cartTotal">
            <p className="item">Shipping</p>
            <p className="itemValue">$2.95</p>
          </div>
          <div className="horizontalRule" />
          <div className="cartTotal">
            <p className="totalHeader">Total</p>
            <p className="totalValue">${(cart.getCartTotal() + 2.95).toFixed(2)}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;

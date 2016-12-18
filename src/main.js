import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import RouteProvider from './RouteProvider';
import localForage from 'localForage';
import Promise from 'bluebird';
import { CartModel } from './models';
import 'source-sans-pro/source-sans-pro.css';


function loadCart() {
  return Promise.resolve()
    .then(() => localForage.getItem('cart'))
    .then(data => {
      const cart = JSON.parse(data);
      return new CartModel(cart);
    });
}

class CartProvider extends Component {

  static childContextTypes = {
    addToCart: PropTypes.func
  }

  state = {
    cart: new CartModel()
  }

  getChildContext() {
    return { addToCart: this.addToCart.bind(this) };
  }

  componentDidMount() {
    loadCart().then(cart => {
      this.setState({ cart: cart });
    });
  }

  addToCart(product, quantity) {
    console.log(product, quantity);
  }

  render() {
    return this.props.children;
  }
}

ReactDOM.render(
  <CartProvider>
    <RouteProvider/>
  </CartProvider>, document.getElementById('react-main'));

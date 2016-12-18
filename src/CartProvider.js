import { Component, PropTypes } from 'react';
import localForage from 'localForage';
import Promise from 'bluebird';
import { CartItemCollection } from './models';

function loadCart() {
  return Promise.resolve()
    .then(() => localForage.getItem('cart'))
    .then(data => {
      const cart = JSON.parse(data);
      return new CartItemCollection(cart);
    });
}

class CartProvider extends Component {

  static childContextTypes = {
    addToCart: PropTypes.func,
    cart: PropTypes.instanceOf(CartItemCollection)
  }

  state = {
    cart: new CartItemCollection()
  }

  getChildContext() {
    return {
      addToCart: this.addToCart.bind(this),
      cart: this.state.cart
     };
  }

  componentDidMount() {
    loadCart().then(cart => {
      this.setState({ cart: cart });
    });
  }

  addToCart(product, quantity) {
    this.setState({ cart: this.state.cart.addItem(product, quantity) });
  }

  render() {
    return this.props.children;
  }
}

export default CartProvider;

import { Component, PropTypes } from 'react';
import localForage from 'localForage';
import Promise from 'bluebird';
import { CartModel } from './models';

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
    this.setState({ cart: this.state.cart.addItems(product, quantity) });
  }

  render() {
    return this.props.children;
  }
}

export default CartProvider;

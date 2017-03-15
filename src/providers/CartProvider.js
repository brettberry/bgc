import { Component, PropTypes } from 'react';
import localForage from 'localForage';
import Promise from 'bluebird';
import { CartItemCollection } from '~/models';

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
    updateCartItem: PropTypes.func,
    removeCartItem: PropTypes.func,
    cart: PropTypes.instanceOf(CartItemCollection)
  }

  state = {
    cart: new CartItemCollection()
  }

  getChildContext() {
    return {
      addToCart: this.addToCart.bind(this),
      updateCartItem: this.updateCartItem.bind(this),
      removeCartItem: this.removeCartItem.bind(this),
      cart: this.state.cart
     };
  }

  componentDidMount() {
    loadCart().then(cart => {
      this.setState({ cart: cart });
    });
  }

  componentDidUpdate() {
    localForage.setItem('cart', JSON.stringify(this.state.cart.toJS()));
  }

  addToCart(product, quantity) {
    this.setState({ cart: this.state.cart.addItem(product, quantity) });
  }

  updateCartItem(product, quantity) {
    this.setState({ cart: this.state.cart.setItem(product, quantity) });
  }

  removeCartItem(product) {
    this.setState({ cart: this.state.cart.removeItem(product) });
  }

  render() {
    return this.props.children;
  }
}

export default CartProvider;

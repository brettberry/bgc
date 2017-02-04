import React, { Component, PropTypes } from 'react';
import CartDetails from './CartDetails';
import MobileCart from './MobileCart';

class CartRenderer extends Component {

  static propTypes = {
    isTablet: PropTypes.bool
  }

  static defaultProps = {
    isTablet: false
  }

  render() {
    return this.props.isTablet ? this.renderTablet() : this.renderDesktop();
  }

  renderTablet() {
    return (
      <div>
        <MobileCart />
      </div>
    );
  }

  renderDesktop() {
    return (
      <div>
        <CartDetails />
      </div>
    );
  }
}

export default CartRenderer;

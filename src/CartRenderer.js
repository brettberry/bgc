import React, { Component, PropTypes } from 'react';
import Cart from './pages/Cart';

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
      <div />
    );
  }

  renderDesktop() {
    return (
      <div>
        <Cart />
      </div>
    );
  }
}

export default CartRenderer;

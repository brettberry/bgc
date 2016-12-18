import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import FaSearch from 'react-icons/lib/fa/search';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import CartItemCollection from './models/CartItemCollection';
import './shoppingCenter.styles.scss';

class ShoppingCenter extends Component {

  static contextTypes = {
    cart: PropTypes.instanceOf(CartItemCollection)
  }

  render() {
    const { className, onSearchClick } = this.props;
    const cartQuantity = this.context.cart.getCartQuantity();
    const showCartQuantity = cartQuantity > 0;
    return (
      <div>
        <div className={classnames('shoppingContainer', className)}>
          <FaSearch className="searchIcon" onClick={onSearchClick} />
          <div className="divider hide" />
          <div className="cartContainer">
            <FaShoppingCart className="cartIcon" />
            {showCartQuantity && <div className="cartQuantity animated bounceIn">{cartQuantity}</div>}
          </div>
          <div className="divider" />
          <h3 className="accountText">My <br/> Account</h3>
        </div>
      </div>
    );
  }
}

export default ShoppingCenter;

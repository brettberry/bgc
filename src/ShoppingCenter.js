import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import FaSearch from 'react-icons/lib/fa/search';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import CartItemCollection from './models/CartItemCollection';
import { Link } from 'react-router';
import './shoppingCenter.styles.scss';

class ShoppingCenter extends Component {

  static contextTypes = {
    cart: PropTypes.instanceOf(CartItemCollection)
  }

  state = {
    showAccountMenu: false
  }

  showMenu() {
    this.setState({ showAccountMenu: true });
    clearTimeout(this.timeout);
  }

  closeMenu() {
    this.timeout = setTimeout(() => {
      this.setState({ showAccountMenu: false });
    }, 150);
  }

  render() {
    const { className, onSearchClick } = this.props;
    const cartQuantity = this.context.cart.getCartQuantity();
    const showCartQuantity = cartQuantity > 0;
    return (
      <div>
        <div>
          <div className={classnames('shoppingContainer', className)}>
            <FaSearch className="searchIcon" onClick={onSearchClick} />
            <div className="divider hide" />
            <Link to={"/cart"}>
              <div className="cartContainer">
                <FaShoppingCart className="cartIcon" />
                {showCartQuantity && <div className="cartQuantity animated bounceIn">{cartQuantity}</div>}
              </div>
            </Link>
            <div className="divider" />
            <Link to={"/my-account"}
                  className={classnames('loginLink', this.state.showAccountMenu && 'showAccountMenu')}
                  onMouseEnter={() => this.showMenu()}
                  onMouseLeave={() => this.closeMenu()}>
              <h3 className="accountItem">My <br/> Account</h3>
              <AccountMenu className="accountMenu" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

class AccountMenu extends Component {

  static propTypes = {
    className: PropTypes.string
  }

  render() {
    return (
      <div className={classnames('accountMenuContainer', this.props.className)}>
        <p className="accountOption">View Account</p>
        <p className="accountOption">Log Out</p>
      </div>
    );
  }
}

export default ShoppingCenter;

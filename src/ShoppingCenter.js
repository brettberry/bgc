import React, { Component, PropTypes } from 'react';
import Button from './Buttons';
import classnames from 'classnames';
import FaSearch from 'react-icons/lib/fa/search';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import CartItemCollection from './models/CartItemCollection';
import FaClose from 'react-icons/lib/fa/close';
import { Link } from 'react-router';
import map from 'lodash/map';
import './shoppingCenter.styles.scss';

class ShoppingCenter extends Component {

  static contextTypes = {
    cart: PropTypes.instanceOf(CartItemCollection)
  }

  state = {
    showAccountMenu: false,
    showCartDropDown: false
  }

  showMenu() {
    this.setState({ showAccountMenu: true });
    clearTimeout(this.timeout);
  }

  closeMenu() {
    this.timeout = setTimeout(() => {
      this.setState({ showAccountMenu: false });
    }, 100);
  }

  showCartDropDown() {
    this.setState({ showCartDropDown: true });
    clearTimeout(this.timeout);
  }

  closeCartDropDown() {
    this.timeout = setTimeout(() => {
      this.setState({ showCartDropDown: false });
    }, 100);
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
            <Link to={"/cart"}
                  className={classnames('cartLink', this.state.showCartDropDown && 'showCartDropDown')}
                  onMouseEnter={() => this.showCartDropDown()}
                  onMouseLeave={() => this.closeCartDropDown()}>
              <div className="cartContainer">
                <FaShoppingCart className="cartIcon" />
                {showCartQuantity && <div className="cartQuantity animated bounceIn">{cartQuantity}</div>}
              </div>
              <CartDropDown className="cartDropDown" cart={this.context.cart}/>
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

class CartDropDown extends Component {

  static propTypes = {
    className: PropTypes.string,
    cart: PropTypes.instanceOf(CartItemCollection)
  }

  getThumbnailImage(item) {
      const productImg = item.getMedia();
      return { backgroundImage: productImg[0] };
  }

  render() {
    const cart = this.props.cart;
    return (
      <div className={classnames('cartDropDownContainer', this.props.className)}>
        <div className="productScrollView">
          <div>{map(cart.toArray(), this.renderItem.bind(this))}</div>
        </div>
        <div className="cartActions">
          <div className="cartTotal">{`Total: $${cart.getCartTotal().toFixed(2)}`}</div>
          <Button text="View Cart" className="cartButton" />
          <Button text="Checkout" className="checkoutButton" />
        </div>
      </div>
    );
  }

  renderItem(item, index) {
    return (
      <div key={index} className="miniCartItemContainer">
        <div className="thumbnailImageDiv" style={this.getThumbnailImage(item)} />
        <div className="details">
          <div className="item">{item.getFullName()}</div>
          <div className="unitPrice">Price: ${(item.getSubtotal() / item.getQuantity()).toFixed(2)}</div>
          <div className="quantity">Quantity: {item.getQuantity()}</div>
        </div>
      </div>
    );
  }
}

export default ShoppingCenter;

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
    clearTimeout(this.accountTimeout);
  }

  closeMenu() {
    this.accountTimeout = setTimeout(() => {
      this.setState({ showAccountMenu: false });
    }, 100);
  }

  showCartDropDown() {
    this.setState({ showCartDropDown: true });
    clearTimeout(this.cartTimeout);
  }

  closeCartDropDown() {
    this.cartTimeout = setTimeout(() => {
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
            <div className="divider" />
            <div className={this.state.showCartDropDown && 'showCartDropDown'}
                 onMouseEnter={() => this.showCartDropDown()}
                 onMouseLeave={() => this.closeCartDropDown()}>
              <Link to={"/cart"} className="cartLink">
                <FaShoppingCart className="cartIcon" />
                {showCartQuantity && <div className="cartQuantity animated bounceIn">{cartQuantity}</div>}
              </Link>
              <CartDropDown className="cartDropDown"
                            cart={this.context.cart}
                            closeCartDropDown={this.closeCartDropDown.bind(this)} />
            </div>
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
    cart: PropTypes.instanceOf(CartItemCollection),
    closeCartDropDown: PropTypes.func.isRequired
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
          <Link to="/cart" className="link">
            <Button text="View Cart"
                    className="cartButton"
                    onClick={() => this.props.closeCartDropDown()} />
          </Link>
          <Link to="/checkout" className="link">
            <Button text="Checkout"
                    className="checkoutButton"
                    onClick={() => this.props.closeCartDropDown()} />
          </Link>
        </div>
      </div>
    );
  }

  renderItem(item, index) {
    const product = item.getProduct();
    return (
      <div key={index} className="miniCartItemContainer">
        <div className="thumbnailImageDiv" style={this.getThumbnailImage(item)} />
        <div className="details">
          <Link to={`/products/${product.getCategory()}/${product.getPathName()}`}
                className="itemLink"
                onClick={() => this.props.closeCartDropDown()}>
            <div className="item">{item.getFullName()}</div>
          </Link>
          <div className="unitPrice">Price: ${(item.getSubtotal() / item.getQuantity()).toFixed(2)}</div>
          <div className="quantity">Quantity: {item.getQuantity()}</div>
        </div>
      </div>
    );
  }
}

export default ShoppingCenter;

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import FaSearch from 'react-icons/lib/fa/search';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import FaBars from 'react-icons/lib/fa/bars';
import MdClose from 'react-icons/lib/md/close';
import './miniNavBar.styles.scss';
import './mobileNavigationBar.styles.scss';

class MobileMiniNavBar extends Component {

  static propTypes = {
    showResponsiveNavBar: PropTypes.bool.isRequired
  }

  state = {
    showMobileMenu: false
  }

  handleBarsClick() {
    this.setState({
      showMobileMenu: !this.state.showMobileMenu
    });
  }

  render() {
    return (
      <div className={classnames('responsiveNavBar', this.props.showResponsiveNavBar && 'showNav')}>
        <div className="navBarContents">
          <Link to="/" className="bgcLink">
            <h1 className="bgc">BGC</h1>
          </Link>
          <div className="iconContainer">
            <FaSearch className="searchIcon" />
            <FaShoppingCart className="cartIcon" />
            <FaBars className="hamburgerIcon" onClick={this.handleBarsClick.bind(this)} />
          </div>
        </div>
        {this.renderMobileMenu()}
      </div>
    );
  }

  renderMobileMenu() {
    if (!this.state.showMobileMenu) {
      return;
    }
    return (
      <div className="mobileMenu">
        <MdClose className="exit" onClick={this.handleBarsClick.bind(this)} />
      </div>
    );
  }
}

function Search() {
  return (
    <div className="searchContainer">
      <div className="searchDiv">
        <input className="searchBar"
               placeholder="Search products"
               autoFocus />
        <div className="searchButton">
          <FaSearch className="searchIcon" />
        </div>
      </div>
    </div>
  );
}

export function ShoppingCenter({ className }) {
  return (
    <div>
      <div className={classnames('shoppingContainer', className)}>
        <FaShoppingCart className="cartIcon" />
        <div className="divider" />
        <h3 className="accountText">My <br/> Account</h3>
      </div>
    </div>
  );
}

export default MobileMiniNavBar;

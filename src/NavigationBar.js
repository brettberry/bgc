import React, { Component, PropTypes } from 'react';
import ProductsMenu from './ProductsMenu';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import FaSearch from 'react-icons/lib/fa/search';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import { Link } from 'react-router';

import './NavigationBar.styles.scss';

class NavigationBar extends Component {

static propTypes = {
  className: PropTypes.string
}

  render() {
    const { className } = this.props;
    return (
      <div>
        <div className="navBar">
          <Link to="/" className="link">
            <h1 className="bgc">Berry Game Calls</h1>
          </Link>
          <Alert />
          <Menu />
          <div className="iconContainer">
            <FaSearch className="search" />
            <FaShoppingCart className="cart" />
          </div>
        </div>
      </div>
    );
  }
}

function bgcSmall() {
  return (
    <div className="bgcContainer">
      <h3 className="bgc">Berry</h3>
      <h3 className="bgc">Game</h3>
      <h3 className="bgc">Calls</h3>
    </div>
  );
}

function Menu() {
  return (
    <div className="menu">
      <div className="menuItem">
        <h3 className="item">Products</h3>
        <div className="underline" />
        <ProductsMenu className="products" />
      </div>
      <div className="menuItem">
        <h3 className="item">Demos</h3>
        <div className="underline" />
      </div>
      <div className="menuItem">
        <h3 className="item">About</h3>
        <div className="underline" />
      </div>
      <div className="menuItem">
        <h3 className="item">Gallery</h3>
        <div className="underline" />
      </div>
      <div className="menuItem">
        <h3 className="item">Seminars</h3>
        <div className="underline" />
      </div>
    </div>
  );
}

function Alert() {
  return (
    <div className="alertBar">
      {/* <h3 className="alertMessage">Check out our online specials!</h3> */}
      {/* <FaChevronRight className="chevron" /> */}
    </div>
  );
}

export default NavigationBar;

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import FaSearch from 'react-icons/lib/fa/search';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import FaBars from 'react-icons/lib/fa/bars';
import './miniNavBar.styles.scss';

class MobileMiniNavBar extends Component {

  static propTypes = {
    showResponsiveNavBar: PropTypes.bool.isRequired
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
            <FaBars className="hamburgerIcon" />
          </div>
        </div>
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

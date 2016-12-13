import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import FaSearch from 'react-icons/lib/fa/search';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import './miniNavBar.styles.scss';

class MiniNavBar extends Component {

  static propTypes = {
    showResponsiveNavBar: PropTypes.bool.isRequired
  }

  render() {
    return (
      <div className={classnames('responsiveNavBar', this.props.showResponsiveNavBar && 'showNav')}>
        <div className="navBarContents">
          <Link to="/" className="bgcLink">
            <h1 className="bgc">Berry Game Calls</h1>
          </Link>
          <Search />
          <ShoppingCenter className="light"/>
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
        <FaSearch className="searchIcon" />
        <div className="divider hide" />
        <FaShoppingCart className="cartIcon" />
        <div className="divider" />
        <h3 className="accountText">My <br/> Account</h3>
      </div>
    </div>
  );
}

export default MiniNavBar;

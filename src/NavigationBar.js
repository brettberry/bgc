import React, { Component } from 'react';
import $ from 'jquery';
// import FaSearch from 'react-icons/lib/fa/search';
import { Link } from 'react-router';
import Waypoint from 'react-waypoint';

import ProductsMenu from './ProductsMenu';
import MiniNavBar, { ShoppingCenter } from './MiniNavBar';
import './navigationBar.styles.scss';

class NavigationBar extends Component {

  state = {
    showResponsiveNavBar: false
  }

  componentDidMount() {
    const scrollTop = $(window).scrollTop();
    if (scrollTop >= 140) {
      this.setState({ showResponsiveNavBar: true });
    }
  }

  render() {
    return (
      <div className="mainNavContainer">
        <div className="navBar">
          <Link to="/" className="link">
            <h1 className="bgc">Berry Game Calls</h1>
          </Link>
          <Menu />
          <ShoppingCenter className="dark" />
        </div>
        <Waypoint onLeave={() => this.setState({ showResponsiveNavBar: true })}
                  onEnter={() => this.setState({ showResponsiveNavBar: false })} />
        <Alert />
        <MiniNavBar showResponsiveNavBar={this.state.showResponsiveNavBar} />
      </div>
    );
  }
}

function Menu() {
  return (
    <div className="menu">
      <div className="menuItem">
        <Link to="/products" className="menuLink">
          <h3 className="item">Products</h3>
        </Link>
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

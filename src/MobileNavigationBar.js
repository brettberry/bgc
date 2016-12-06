import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import Waypoint from 'react-waypoint';
import ProductsMenu from './ProductsMenu';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import MiniNavBar, { ShoppingCenter } from './MiniNavBar';
import MobileMiniNavBar from './MobileMiniNavBar';
import './navigationBar.styles.scss';
import FaBars from 'react-icons/lib/fa/bars';

class MobileNavigationBar extends Component {

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
          <div className="iconContainer">
            <FaShoppingCart className="condensedCart" />
            <FaBars className="hamburger" />
          </div>
        </div>
        <Waypoint onLeave={() => this.setState({ showResponsiveNavBar: true })}
                  onEnter={() => this.setState({ showResponsiveNavBar: false })} />
        <Alert />
        <MobileMiniNavBar showResponsiveNavBar={this.state.showResponsiveNavBar} />
      </div>
    );
  }
}

function ProductsItem() {
  return (
    <div className="menuItem">
      <Link to="/products" className="menuLink">
        <h3 className="item">Products</h3>
      </Link>
        <div className="underline" />
      <ProductsMenu className="products" />
    </div>
  );
}

function DemosItem() {
  return (
    <div className="menuItem">
      <Link to="/demos" className="menuLink">
        <h3 className="item">Demos</h3>
      </Link>
      <div className="underline" />
    </div>
  );
}

function AboutItem() {
  return (
    <div className="menuItem">
      <Link to="/about" className="menuLink">
        <h3 className="item">About</h3>
      </Link>
      <div className="underline" />
    </div>
  );
}

function GalleryItem() {
  return (
    <div className="menuItem">
      <Link to="/gallery" className="menuLink">
        <h3 className="item">Gallery</h3>
      </Link>
      <div className="underline" />
    </div>
  );
}

function EventsItem() {
  return (
    <div className="menuItem">
      <Link to="/events" className="menuLink">
        <h3 className="item">Events</h3>
      </Link>
      <div className="underline" />
    </div>
  );
}

function Alert() {
  return (
    <div className="alertBar">
      <h3 className="alertMessage right">Flat rate shipping on all orders.</h3>
    </div>
  );
}

export default MobileNavigationBar;

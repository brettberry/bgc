import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import Waypoint from 'react-waypoint';
import ProductsMenu from './ProductsMenu';
import MiniNavBar, { ShoppingCenter } from './MiniNavBar';
import './navigationBar.styles.scss';
import MDLocalDelivery from 'react-icons/lib/md/local-shipping';
import classnames from 'classnames';

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
          <Link to="/" className="homeLink">
            <h1 className="bgc">Berry Game Calls</h1>
          </Link>
          <Menu />
          <ShoppingCenter className="dark" />
        </div>
        <Waypoint scrollableAncestor={window}
                  onLeave={() => this.setState({ showResponsiveNavBar: true })}
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
      <ProductsItem />
      <DemosItem />
      <GalleryItem />
      <EventsItem />
      <AboutItem />
    </div>
  );
}

class ProductsItem extends Component {

  state = {
    showProductsMenu: false
  }

  showMenu() {
    this.setState({ showProductsMenu: true });
    clearTimeout(this.timeout);
  }

  closeMenu() {
    this.timeout = setTimeout(() => {
      this.setState({ showProductsMenu: false });
    }, 300);
  }

  render() {
    return (
      <div className={classnames('menuItem', this.state.showProductsMenu && 'showProductsMenu')}
           onMouseEnter={() => this.showMenu()}
           onMouseLeave={() => this.closeMenu()}>
        <Link to="/products" className="menuLink">
          <h3 className="item">Products</h3>
        </Link>
          <div className="underline" />
        <ProductsMenu className="productsMenu" onItemClick={() => this.setState({ showProductsMenu: false })} />
      </div>
    );
  }
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
      <MDLocalDelivery className="shippingIcon" />
      <h3 className="alertMessage right">Flat rate shipping on all orders.</h3>
    </div>
  );
}

export default NavigationBar;

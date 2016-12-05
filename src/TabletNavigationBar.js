import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import Waypoint from 'react-waypoint';
import ProductsMenu from './ProductsMenu';
import MiniNavBar, { ShoppingCenter } from './MiniNavBar';
import './navigationBar.styles.scss';
import MoreMenu from './MoreMenu';

class TabletNavigationBar extends Component {

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
    <div className="tabletMenu">
      <ProductsItem />
      <DemosItem />
      <MoreItem />
    </div>
  );
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

function MoreItem() {
  return (
    <div className="menuItem">
      <h3 className="item">More</h3>
      <div className="underline" />
      <MoreMenu className="moreDropDown"/>
    </div>
  );
}

function Alert() {
  return (
    <div className="alertBar" />
  );
}

export default TabletNavigationBar;

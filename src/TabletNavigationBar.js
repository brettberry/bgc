import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import Waypoint from 'react-waypoint';
import ProductsMenu from './ProductsMenu';
import MiniNavBar, { ShoppingCenter } from './MiniNavBar';
import './navigationBar.styles.scss';
import MoreMenu from './MoreMenu';
import classnames from 'classnames';

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
    <div className="tabletMenu">
      <ProductsItem />
      <DemosItem />
      <MoreItem />
    </div>
  );
}

class ProductsItem extends Component {

  state = {
    showProductsMenu: false
  }

  render() {
    return (
      <div className={classnames('menuItem', this.state.showProductsMenu && 'showProductsMenu')}
           onClick={() => this.setState({ showProductsMenu: !this.state.showProductsMenu })}>
        <Link to="/products" className="menuLink">
          <h3 className="item">Products</h3>
          <div className="underline" />
        </Link>
        <ProductsMenu className="productsMenu"
                      onItemClick={() => this.setState({ showProductsMenu: !this.state.showProductsMenu })}
                      closeMenu={() => this.setState({ showProductsMenu: false })} />
      </div>
    );
  }
}

function DemosItem() {
  return (
    <div className="menuItem">
      <Link to="/demos" className="menuLink">
        <h3 className="item">Demos</h3>
        <div className="underline" />
      </Link>
    </div>
  );
}

class MoreItem extends Component {

  state = {
    showMoreMenu: false
  }

  render() {
    return (
      <div className={classnames('moreDropDownMenuItem', this.state.showMoreMenu && 'showMoreMenu')}
           onClick={() => this.setState({ showMoreMenu: !this.state.showMoreMenu })}>
        <h3 className="item">More</h3>
        <div className="underline" />
        <MoreMenu className="moreDropDown" onItemClick={() => this.setState({ showMoreMenu: false })} />
      </div>
    );
  }
}

function Alert() {
  return (
    <div className="alertBar" />
  );
}

export default TabletNavigationBar;

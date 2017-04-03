import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Waypoint from 'react-waypoint';
import $ from 'jquery';

import ProductsMenu from './ProductsMenu';
import ShoppingCenter from './ShoppingCenter';
import MiniNavBar from './MiniNavBar';
import GalleryMenu from './GalleryMenu';
import './galleryMenu.styles.scss';
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

  renderStandardNavBar() {
    return (
    <div className="navBar">
      <Link to="/" className="homeLink">
        <div style={{ backgroundImage: 'url(/images/bgc_logo.png)' }}
             className="bgcLogoSmall"/>
        <h1 className="bgc">Berry Game Calls</h1>
      </Link>
      <div className="menu">
        <ProductsItem/>
        <DemosItem/>
        <GalleryItem/>
      </div>
      <ShoppingCenter onSearchClick={this.handleSearchClick.bind(this)}/>
    </div>
   );
  }

  handleSearchClick() {
    $(window).scrollTop(140);
    this.refs.miniNavBar.focusInput();
  }

  render() {
    return (
      <div className="mainNavContainer">
        {this.renderStandardNavBar()}
        <Waypoint scrollableAncestor={window}
                  onLeave={() => this.setState({ showResponsiveNavBar: true })}
                  onEnter={() => this.setState({ showResponsiveNavBar: false })}/>
        <div className="alertBar"/>
        <MiniNavBar showResponsiveNavBar={this.state.showResponsiveNavBar} ref="miniNavBar"/>
      </div>
    );
  }
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
        <Link to="/products"
              className="menuLink"
              onClick={() => this.setState({ showProductsMenu: false })}>
          <h3 className="item">Products</h3>
          <div className="underline"/>
        </Link>
        <ProductsMenu className="productsMenu"
                      onItemClick={() => this.setState({ showProductsMenu: false })}/>
      </div>
    );
  }
}

function DemosItem() {
  return (
    <div className="menuItem">
      <Link to="/demos" className="menuLink">
        <h3 className="item">Demos</h3>
        <div className="underline"/>
      </Link>
    </div>
  );
}

class GalleryItem extends Component {

  state = {
    showDropDown: false
  }

  showDropDown() {
    this.setState({ showDropDown: true });
    clearTimeout(this.timeout);
  }

  closeDropDown() {
    this.timeout = setTimeout(() => {
      this.setState({ showDropDown: false });
    }, 300);
  }

  render() {
    return (
      <div className={classnames('menuItem', this.state.showDropDown && 'showGalleryMenu')}
           onMouseEnter={() => this.showDropDown()}
           onMouseLeave={() => this.closeDropDown()}>
        <Link to="/gallery" className="menuLink">
          <h3 className="item">Gallery</h3>
          <div className="underline"/>
        </Link>
        <GalleryMenu className="galleryMenu"
                     onItemClick={() => this.setState({ showDropDown: false })}/>
      </div>
    );
  }
}

export default NavigationBar;

import React, { Component } from 'react';
import { Link } from 'react-router';
import Waypoint from 'react-waypoint';
import $ from 'jquery';

import ProductsMenuItem from './ProductsMenuItem';
import GalleryMenuItem from './GalleryMenuItem';
import ShoppingCenter from './ShoppingCenter';
import MiniNavBar from './MiniNavBar';
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
        <ProductsMenuItem/>
        <DemosMenuItem/>
        <GalleryMenuItem/>
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

function DemosMenuItem() {
  return (
    <div className="menuItem">
      <Link to="/demos" className="menuLink">
        <h3 className="item">Demos</h3>
        <div className="underline"/>
      </Link>
    </div>
  );
}

export default NavigationBar;

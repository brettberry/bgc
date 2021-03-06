import React, { Component } from 'react';
import { Link } from 'react-router';
import Waypoint from 'react-waypoint';
import $ from 'jquery';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import FaBars from 'react-icons/lib/fa/bars';

import MobileExpandedMenu from './MobileExpandedMenu';
import MobileMiniNavBar from './MobileMiniNavBar';
import './mobileNavigationBar.styles.scss';

class MobileNavigationBar extends Component {

  state = {
    showResponsiveNavBar: false,
    showMobileMenu: false
  }

  componentDidMount() {
    const scrollTop = $(window).scrollTop();
    if (scrollTop >= 140) {
      this.setState({ showResponsiveNavBar: true });
    }
  }

  handleBarsClick() {
    this.setState({
      showMobileMenu: !this.state.showMobileMenu
    });
  }

  render() {
    return (
      <div className="mobileNavContainer">
        <div className="mobileNavBar">
          <Link to="/" className="link">
            <div style={{ backgroundImage: 'url(/images/bgc_logo.png)' }}
                 className="bgcMobileLogo"/>
            <h1 className="bgcMobile">Berry Game Calls</h1>
          </Link>
          <div className="iconContainer">
            <Link to="/cart">
              <FaShoppingCart className="cart"/>
            </Link>
            <FaBars className="hamburger" onClick={this.handleBarsClick.bind(this)}/>
          </div>
        </div>
        <Waypoint scrollableAncestor={window}
                  onLeave={() => this.setState({ showResponsiveNavBar: true })}
                  onEnter={() => this.setState({ showResponsiveNavBar: false })}/>
        <div className="alertBar"/>
        <MobileMiniNavBar showResponsiveNavBar={this.state.showResponsiveNavBar}/>
        {this.renderMobileMenu()}
      </div>
    );
  }

  renderMobileMenu() {
    if (!this.state.showMobileMenu) {
      return;
    }
    return (
      <MobileExpandedMenu onClose={this.handleBarsClick.bind(this)}/>
    );
  }
}

export default MobileNavigationBar;

import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import Waypoint from 'react-waypoint';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import MobileMiniNavBar from './MobileMiniNavBar';
import FaBars from 'react-icons/lib/fa/bars';
import MobileExpandedMenu from './MobileExpandedMenu';
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
            <h1 className="bgc">Berry</h1>
            <h1 className="bgc">Game Calls</h1>
          </Link>
          <div className="iconContainer">
            <FaShoppingCart className="cart" />
            <FaBars className="hamburger" onClick={this.handleBarsClick.bind(this)} />
          </div>
        </div>
        <Waypoint scrollableAncestor={window}
                  onLeave={() => this.setState({ showResponsiveNavBar: true })}
                  onEnter={() => this.setState({ showResponsiveNavBar: false })} />
        <Alert />
        <MobileMiniNavBar showResponsiveNavBar={this.state.showResponsiveNavBar} />
        {this.renderMobileMenu()}
      </div>
    );
  }

  renderMobileMenu() {
    if (!this.state.showMobileMenu) {
      return;
    }
    return (
      <MobileExpandedMenu onClose={this.handleBarsClick.bind(this)} />
    );
  }
}

function Alert() {
  return (
    <div className="alertBar">
      <h3 className="alertMessage right">Flat rate shipping on all orders.</h3>
    </div>
  );
}

export default MobileNavigationBar;

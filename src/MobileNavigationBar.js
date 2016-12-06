import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import Waypoint from 'react-waypoint';
import ProductsMenu from './ProductsMenu';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
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
            <h1 className="bgc">Berry</h1>
            <h1 className="bgc">Game Calls</h1>
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

function Alert() {
  return (
    <div className="alertBar">
      <h3 className="alertMessage right">Flat rate shipping on all orders.</h3>
    </div>
  );
}

export default MobileNavigationBar;

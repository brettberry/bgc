import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import ProductsMenu from './ProductsMenu';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import FaSearch from 'react-icons/lib/fa/search';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import { Link } from 'react-router';
import './navigationBar.styles.scss';
import Waypoint from 'react-waypoint';
import classnames from 'classnames';

class NavigationBar extends Component {

  static propTypes = {
    className: PropTypes.string
  }

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
    const { className } = this.props;
    const { showResponsiveNavBar } = this.state;
    return (
      <div>
        <div className="navBar">
          <Link to="/" className="link">
            <h1 className="bgc">Berry Game Calls</h1>
          </Link>
          <Menu />
          <div className="iconContainer">
            <FaSearch className="search" />
            <FaShoppingCart className="cart" />
          </div>
        </div>
        <Alert />
        <Waypoint onLeave={() => this.setState({ showResponsiveNavBar: true })}
                  onEnter={() => this.setState({ showResponsiveNavBar: false })} />
        <div className={classnames('responsiveNavBar', showResponsiveNavBar && 'showNav')}/>
      </div>
    );
  }
}

function bgcSmall() {
  return (
    <div className="bgcContainer">
      <h3 className="bgc">Berry</h3>
      <h3 className="bgc">Game</h3>
      <h3 className="bgc">Calls</h3>
    </div>
  );
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

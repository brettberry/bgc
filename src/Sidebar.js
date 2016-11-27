import React, { Component, PropTypes } from 'react';
import './sidebar.styles.scss';
import FaChevronCircleUp from 'react-icons/lib/fa/chevron-circle-up';
import { Link } from 'react-router';
import classnames from 'classnames';

export default class Sidebar extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render() {
    const { router } = this.context;
    const isActive = router.isActive('/products');
    return (
      <div className="sidebarContainer">
        <Link to="/products" className="sidebarLink">
          <div className={classnames('categoryContainer', isActive && 'active')}>
            <FaChevronCircleUp className="downArrow"/>
            <h3 className="callType">All Products</h3>
          </div>
        </Link>
        <Link to="/products/tags/popular" className="sidebarLink">
          <div className="categoryContainer">
            <FaChevronCircleUp className="downArrow"/>
            <h3 className="callType">Most Popular</h3>
          </div>
        </Link>
        <Link to="/products/tags/online-specials" className="sidebarLink">
          <div className="categoryContainer">
            <FaChevronCircleUp className="downArrow"/>
            <h3 className="callType">Online Specials</h3>
          </div>
        </Link>
        <Link to="/products/tags/bugles" className="sidebarLink">
          <div className="categoryContainer">
            <FaChevronCircleUp className="downArrow"/>
            <h3 className="callType">Thunder Bugles</h3>
          </div>
        </Link>
        <Link to="/products/tags/golden-dome" className="sidebarLink">
          <div className="categoryContainer">
            <FaChevronCircleUp className="downArrow"/>
            <h3 className="callType">Golden Dome</h3>
          </div>
        </Link>
        <Link to="/products/tags/x-series" className="sidebarLink">
          <div className="categoryContainer">
            <FaChevronCircleUp className="downArrow"/>
            <h3 className="callType">X-Series</h3>
          </div>
        </Link>
        <Link to="/products/tags/big-bull" className="sidebarLink">
          <div className="categoryContainer">
            <FaChevronCircleUp className="downArrow"/>
            <h3 className="callType">Big Bull Reeds</h3>
          </div>
        </Link>
        <Link to="/products/tags/cow-calls" className="sidebarLink">
          <div className="categoryContainer">
            <FaChevronCircleUp className="downArrow"/>
            <h3 className="callType">Cow Calls</h3>
          </div>
        </Link>
        <Link to="/products/tags/dvds" className="sidebarLink">
          <div className="categoryContainer">
            <FaChevronCircleUp className="downArrow"/>
            <h3 className="callType">Hunting Movies</h3>
          </div>
        </Link>
        <Link to="/products/tags/other" className="sidebarLink">
          <div className="categoryContainer">
            <FaChevronCircleUp className="downArrow"/>
            <h3 className="callType">Accessories</h3>
          </div>
        </Link>
        <Link to="/products/tags/sale" className="sidebarLink">
          <div className="categoryContainer">
            <FaChevronCircleUp className="downArrow"/>
            <h3 className="callType">Clearance</h3>
          </div>
        </Link>
      </div>
    );
  }
}

import React, { Component } from 'react';
import './mobileSidebar.styles.scss';
import FaChevronCircleUp from 'react-icons/lib/fa/chevron-circle-up';
// import { Link } from 'react-router';
// import classnames from 'classnames';

export default class MobileSidebar extends Component {
  render() {
    return (
      <div className="bottomBar">
        <FaChevronCircleUp className="leftArrow" />
        <h3 className="category">All Products</h3>
        <FaChevronCircleUp className="rightArrow" />
      </div>
    );
  }
}

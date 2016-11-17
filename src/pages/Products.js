import React, { Component } from 'react';
import FaChevronCircleUp from 'react-icons/lib/fa/chevron-circle-up';
import './products.styles.scss';

export default class Product extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        {/* <ProductGrid /> */}
      </div>
    );
  }
}

function Sidebar() {
  return (
    <div className="sidebarContainer">
      <div className="categoryContainer">
        <FaChevronCircleUp className="downArrow"/>
        <h3 className="callType">Most Popular</h3>
      </div>
      <div className="categoryContainer">
        <FaChevronCircleUp className="downArrow"/>
        <h3 className="callType">Online Specials</h3>
      </div>
      <div className="categoryContainer">
        <FaChevronCircleUp className="downArrow"/>
        <h3 className="callType">Thunder Bugles</h3>
      </div>
      <div className="categoryContainer">
        <FaChevronCircleUp className="downArrow"/>
        <h3 className="callType">Golden Dome Reeds</h3>
      </div>
      <div className="categoryContainer">
        <FaChevronCircleUp className="downArrow"/>
        <h3 className="callType">X-Series</h3>
      </div>
      <div className="categoryContainer">
        <FaChevronCircleUp className="downArrow"/>
        <h3 className="callType">Original Big Bull Reeds</h3>
      </div>
      <div className="categoryContainer">
        <FaChevronCircleUp className="downArrow"/>
        <h3 className="callType">Cow Calls</h3>
      </div>
      <div className="categoryContainer">
        <FaChevronCircleUp className="downArrow"/>
        <h3 className="callType">Hunting Movies</h3>
      </div>
      <div className="categoryContainer">
        <FaChevronCircleUp className="downArrow"/>
        <h3 className="callType">Other</h3>
      </div>
    </div>
  );
}

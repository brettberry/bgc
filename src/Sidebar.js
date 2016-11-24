import React from 'react';
import './sidebar.styles.scss';
import FaChevronCircleUp from 'react-icons/lib/fa/chevron-circle-up';

export default function Sidebar() {
  return (
    <div className="sidebarContainer">
      <div className="categoryContainer">
        <FaChevronCircleUp className="downArrow"/>
        <h3 className="callType">All Products</h3>
      </div>
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
        <h3 className="callType">Golden Dome</h3>
      </div>
      <div className="categoryContainer">
        <FaChevronCircleUp className="downArrow"/>
        <h3 className="callType">X-Series</h3>
      </div>
      <div className="categoryContainer">
        <FaChevronCircleUp className="downArrow"/>
        <h3 className="callType">Big Bull Reeds</h3>
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
        <h3 className="callType">Accessories</h3>
      </div>
      <div className="categoryContainer">
        <FaChevronCircleUp className="downArrow"/>
        <h3 className="callType">Clearance</h3>
      </div>
    </div>
  );
}

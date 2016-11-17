import React, { Component } from 'react';
import FaChevronCircleUp from 'react-icons/lib/fa/chevron-circle-up';
import './products.styles.scss';
import { FeaturedItem } from '../Home';

export default class Product extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <ProductGrid />
      </div>
    );
  }
}

function Sidebar() {
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
        <h3 className="callType">Other</h3>
      </div>
    </div>
  );
}

function ProductGrid() {
  return (
    <div className="gridContainer">
      <GridRow />
      <GridRow />
      <GridRow />
      <GridRow />
      <GridRow />
    </div>
  );
}

function GridRow() {
  return (
    <div className="gridRow">
      <div className="gridBox"></div>
      <div className="gridBox"></div>
    </div>
  );
}

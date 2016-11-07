import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import './home.styles.scss';


class Home extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Featured />
      </div>
    );
  }
}

function Featured() {
  return (
    <div className="featuredItems">
      <span className="featuredSpan">Featured Items</span>
      <div className="featured">
        <div className="featuredItem"></div>
        <div className="featuredItem"></div>
        <div className="featuredItem"></div>
      </div>
      <div className="featured">
        <div className="featuredItem"></div>
        <div className="featuredItem"></div>
        <div className="featuredItem"></div>
      </div>
    </div>
  );
}


export default Home;

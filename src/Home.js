import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import './home.styles.scss';


class Home extends Component {
  render() {
    return (
      <div>
        <NavigationBar className="navBar"/>
        <FirstSection />
        <Featured />
        <DemoSection />
        <ShopCategories />
      </div>
    );
  }
}

function Button({ text }) {
  return (
    <div className="button">
      <span className="buttonText">{text}</span>
    </div>
  );
}

function FirstSection() {
  return (
    <div className="firstContainer">
      <div className="firstSec"></div>
    </div>
  );
}

function Featured() {
  return (
    <div className="featuredItems">
      <div className="titleContainer">
        <span className="title">Featured Items</span>
        <Button text="view all"/>
      </div>
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

function DemoSection() {
  return (
    <div className="categoryContainer">
      <span className="title">How To Demonstration</span>
      <div className="demoSection">
        <div className="demo"></div>
        <div className="demoInfo">
          <p></p>
        </div>
      </div>
    </div>
  );
}

function ShopCategories() {
  return (
    <div className="categoryContainer">
      <span className="title">Shop Now</span>
      <div className="categories">
        <div className="category">
          <p className="categoryTitle">Bugles</p>
        </div>
        <div className="category">
          <p className="categoryTitle">Mouth Reeds</p>
        </div>
        <div className="category">
          <p className="categoryTitle">Movies</p>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React, { Component } from 'react';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import Button from './Buttons';
import './buttons.styles.scss';
import './home.styles.scss';


class Home extends Component {
  render() {
    return (
      <div>
        <FirstSection />
        <Featured />
        <DemoSection />
        <ShopCategories />
        <Footer />
      </div>
    );
  }
}

function FirstSection() {
  return (
    <div className="firstContainer">
      <div className="firstSec">
        <div className="chevronContainer">
          <FaChevronLeft className= "chevron"/>
        </div>
        <div className="dotContainer">
          <div className="dot1"/>
          <div className="dot"/>
          <div className="dot"/>
        </div>
        <div className="chevronContainer">
          <FaChevronRight className="chevron" />
        </div>

      </div>
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
    <div className="demoContainer">
      <span className="demoTitle">How To Demonstration</span>
      <div className="demoSection">
        <div className="demo"></div>
        <div className="demoInfo">
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
          <img src="/fulldraw.jpg" className="bkgrdimg" />
          <p className="categoryTitle">Bugles</p>
        </div>
        <div className="category">
          <img src="/fulldraw.jpg" className="bkgrdimg" />
          <p className="categoryTitle">Mouth Reeds</p>
        </div>
        <div className="category">
          <img src="/fulldraw.jpg" className="bkgrdimg" />
          <p className="categoryTitle">Movies</p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer" />
  );
}

export default Home;

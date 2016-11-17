import React, { Component } from 'react';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import { Link } from 'react-router';
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
          <Link to="/products" className="viewAllLink">
            <Button text="view all" />
          </Link>
      </div>
      <div className="featured">
        <FeaturedItem title="Thunder Bugle Pro"
                      price="$49.95" />
        <FeaturedItem title="Golden Tone Grunt Tube"
                      price="$24.95" />
        <FeaturedItem title="Elk Hunters Training Day 2"
                      price="$14.95" />
      </div>
      <div className="featured">
      <FeaturedItem title="Sleazy Cow Call"
                    price="$14.95" />
      <FeaturedItem title="Golden Dome Large Bull"
                    price="$6.95" />
      <FeaturedItem title="Original Thunder Bugle"
                    price="$34.50" />
      </div>
    </div>
  );
}

function FeaturedItem({ title, price }) {
  return (
    <div className="featuredItem">
      <div className="detailsContainer">
        <div className="infoContainer">
          <h2 className="smallProductTitle">{title}</h2>
          <h3 className="smallProductPrice">{price}</h3>
        </div>
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
        <div className="demoInfo"></div>
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

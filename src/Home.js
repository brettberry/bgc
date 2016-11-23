import React, { Component } from 'react';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import { Link } from 'react-router';
import Button from './Buttons';
import Footer from './Footer';
import './buttons.styles.scss';
import './home.styles.scss';
import data from './data.json';
import { ProductCollection } from './models';
import map from 'lodash/map';

const products = new ProductCollection(data.products);

class Home extends Component {

  render() {
    const featured = products.filterByCategory('featured');
    return (
      <div>
        <FirstSection />
        <Featured featured={featured} />
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

function Featured({ featured }) {
  return (
      <div className="featured">{map(featured.toArray(), (feature, key) =>
          <div className="featuredContainer">
            <Link key={key} to={`/products/${feature.getPathName()}`} className="link">
              <div className="featuredItem">
                <h3 className="title">{feature.getFullName()}</h3>
              </div>
            </Link>
          </div>)
      }</div>
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

export default Home;

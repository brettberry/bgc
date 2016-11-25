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
import classnames from 'classnames';

const products = new ProductCollection(data.products);

class Home extends Component {

  render() {
    const featured = products.filterByTag('featured');
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
    <div>
      <div className="titleContainer">
        <h1 className="sectionTitle">Featured Products</h1>
        <Link to="/products" className="viewAllLink">
          <Button text="view all" />
        </Link>
      </div>
      <div className="featured">
        {map(featured.toArray(), (feature, key) =>
          <FeaturedItem feature={feature} key={key} />
        )}
      </div>
    </div>
  );
}

function FeaturedItem({ feature, key }) {
  const price = feature.getPrice().getAmount();
  const discount = feature.getPrice().getDiscount();
  const showDiscount = !!discount;
  const priceClasses = classnames('smallProductPrice', showDiscount && 'strike');
  return (
    <div className="featuredContainer">
      <Link key={key} to={`/products/${feature.getCategory()}/${feature.getPathName()}`} className="featuredItemLink">
        <div className="featuredItem">
          <h3 className="smallProductTitle">{feature.getFullName()}</h3>
          <div className="priceContainer">
            <p className={priceClasses}>${price}</p>
            {showDiscount && <p className="smallDiscountPrice">${discount}</p>}
          </div>
        </div>
      </Link>
    </div>
  );
}

function DemoSection() {
  return (
    <div className="demoContainer">
      <span className="sectionTitle">How To Demonstration</span>
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
      <span className="sectionTitle">Shop Now</span>
      <div className="categories">
        <Link to="/products/tags/bugles" className="categoryLink">
          <div className="category">
            {/* <img src="/fulldraw.jpg" className="bkgrdimg" /> */}
            <p className="categoryTitle">Bugles</p>
          </div>
        </Link>
        <Link to="/products/tags/reeds" className="categoryLink">
          <div className="category">
            {/* <img src="/fulldraw.jpg" className="bkgrdimg" /> */}
            <p className="categoryTitle">Mouth Reeds</p>
          </div>
        </Link>
        <Link to="/products/tags/dvds" className="categoryLink">
          <div className="category">
            {/* <img src="/fulldraw.jpg" className="bkgrdimg" /> */}
            <p className="categoryTitle">Movies</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;

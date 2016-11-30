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
import $ from 'jquery';

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
    <div className="sliderContainer">
      <div className="slider">
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
        <h1 className="title">Featured Products</h1>
        <Link to="/products" className="link">
          <Button text="view all" className="viewAllButton" />
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
  const priceClasses = classnames('price', showDiscount && 'strike');
  return (
    <div className="featuredContainer">
      <Link key={key} to={`/products/${feature.getCategory()}/${feature.getPathName()}`} className="link">
        <div className="featuredDiv">
          <h3 className="title">{feature.getFullName()}</h3>
          <div className="priceContainer">
            <p className={priceClasses}>${price}</p>
            {showDiscount && <p className="discount">${discount}</p>}
          </div>
        </div>
      </Link>
    </div>
  );
}

class DemoSection extends Component {

  state = {
    frameWidth: 0,
    frameHeight: 0
  }

  constructor(props) {
    super(props);
    this._updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    $(window).on('resize', this._updateDimensions);
  }

  componentWillUnmount() {
    $(window).off('resize', this._updateDimensions);
  }

  updateDimensions() {
    const screenWidth = $(window).width();
    const frameWidth = screenWidth * 0.55;
    const frameHeight = frameWidth * 0.5625;
    this.setState({ frameWidth, frameHeight });
  }

  render() {
    const { frameWidth, frameHeight } = this.state;
    const thunderBugle = products.findByPathName('thunder-bugle');
    return (
      <div className="demoContainer">
        <span className="title">The Revolutionary Berry Thunder Bugle</span>
        <div className="demoSection">
          <div className="demo">
            <iframe height={frameHeight} width={frameWidth} src={"https://www.youtube.com/embed/bLAz_kbihLE"} frameBorder="0" allowFullScreen />
          </div>
          <div className="demoInfo">
            <p className="info">{thunderBugle.getDescription()}</p>
            <div className="buttonContainer">
              <Link to="/products/bugles/thunder-bugle" className="link">
                <Button text="Details" className="detailsButton" />
              </Link>
              <Link className="link">
                <Button text="Add To Cart" className="cartButton" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function ShopCategories() {
  return (
    <div className="categoryContainer">
      <span className="header">Shop Now</span>
      <div className="categories">
        <Link to="/products/tags/bugles" className="link">
          <div className="category">
            <p className="title">Bugles</p>
          </div>
        </Link>
        <Link to="/products/tags/reeds" className="link">
          <div className="category">
            <p className="title">Mouth Reeds</p>
          </div>
        </Link>
        <Link to="/products/tags/dvds" className="link">
          <div className="category">
            <p className="title">Movies</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;

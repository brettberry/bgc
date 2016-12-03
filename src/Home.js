import React, { Component } from 'react';
import { Link } from 'react-router';
import Footer from './Footer';
import './buttons.styles.scss';
import './home.styles.scss';
import Demo from './HomePageDemo';
import Slider from './Slider';
import Featured from './ProductFeature';

class Home extends Component {

  render() {
    return (
      <div>
        <Slider />
        <Banner />
        <Demo />
        <Featured />
        <ShopCategories />
        {/* <Banner2 /> */}
        <MobileBanner2 />
        <Footer />
      </div>
    );
  }
}

function Banner() {
  return (
    <div className="bannerContainer">
      <div className="rowContainer">
        <h2 className="header1">Join the revolution of </h2>
        <h2 className="header1 highlight">&nbsp;self-made </h2>
        <h2 className="header1">&nbsp;sportsmen and women.</h2>
      </div>
      <div className="rowContainer">
        <h2 className="header1">Those who know</h2>
        <h2 className="header1 highlight">&nbsp;do-it-yourself</h2>
        <h2 className="header1">&nbsp;isn't a phrase, but a way of life.</h2>
      </div>
      <div className="rowContainer">
        <h2 className="header1">Who hear the</h2>
        <h2 className="header1 highlight">&nbsp;call of the wild</h2>
        <h2 className="header1">, and respond.</h2>
      </div>
    </div>
  );
}

function ShopCategories() {
  return (
    <div className="categoryContainer">
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

function Banner2() {
  return (
    <div className="bannerContainer">
      <div className="rowContainer">
        <h2 className="header3">Built for hunters, by hunters</h2>
        <h2 className="header3 highlight">&nbsp;since 1983.</h2>
      </div>
    </div>
  );
}

function MobileBanner2() {
  return (
    <div className="mobileBannerContainer">
      <div className="rowContainer">
        <h3 className="mobileHeader">Built for hunters,</h3>
        <h3 className="mobileHeader">by hunters</h3>
        <h3 className="mobileHeader highlight">since 1983.</h3>
      </div>
    </div>
  );
}

export default Home;

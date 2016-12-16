import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Footer from './Footer';
import './buttons.styles.scss';
import './home.styles.scss';
import Demo from './HomePageDemo';
import Slider from './Slider';
import Featured from './ProductFeature';
import TabletProvider from './TabletProvider';
import MobileProvider from './MobileProvider';

class Home extends Component {
  render() {
    return (
      <div>
        <Slider />
        <MobileProvider>
          <Banner />
        </MobileProvider>
        <Demo />
        <Featured />
        {/* <Images /> */}
        <ShopCategories />
        <TabletProvider>
          <Banner2 />
        </TabletProvider>
        <Footer />
      </div>
    );
  }
}

class Banner extends Component {

  static propTypes = {
    isMobile: PropTypes.bool
  }

  static defaultProps = {
    isMobile: false
  }

  render() {
    return this.props.isMobile ? this.renderMobile() : this.renderDesktop();
  }

  renderMobile() {
    return (
      <div>
        <div className="mobileBanner1">
          <div className="first">
            <h1 className="header">Join the Revolution</h1>
            <div className="inline">
              <h1 className="header">of</h1>
              <h1 className="header highlight">&nbsp;self-made</h1>
              <h1 className="header">&nbsp;hunters.</h1>
            </div>
          </div>
          <div className="second">
            <h1 className="header">Who know</h1>
            <h1 className="header">"do-it-yourself"</h1>
            <h1 className="header">isn't a phrase,</h1>
            <div className="inline">
              <h1 className="header">but a</h1>
              <h1 className="header highlight">&nbsp;way of life.</h1>
            </div>
          </div>
          <div className="third">
            <h1 className="header">Those who hear the</h1>
            <h1 className="header highlight">call of the wild,</h1>
            <h1 className="header">&nbsp;and respond.</h1>
          </div>
        </div>
      </div>
    );
  }

  renderDesktop() {
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
}

function Images() {
  return (
    <div>
      <img src="../glen-elk-2016.jpg" className="mainPageImg" />
    </div>
  );
}

function ShopCategories() {
  const sampleImage = 'url(/samplePhotos/flower.jpg)';

  return (
    <div className="categoryContainer">
      <div className="categories">
        <Link to="/products/tags/bugles" className="link">
          <div className="category">
            <div className="imageContainer">
              <div className="productImage" style={{ backgroundImage: sampleImage }} />
            </div>
            <p className="title">Bugles</p>
          </div>
        </Link>
        <Link to="/products/tags/reeds" className="link">
          <div className="category">
            <div className="imageContainer">
              <div className="productImage" style={{ backgroundImage: sampleImage }} />
            </div>
            <p className="title">Mouth Reeds</p>
          </div>
        </Link>
        <Link to="/products/tags/dvds" className="link">
          <div className="category">
            <div className="imageContainer">
              <div className="productImage" style={{ backgroundImage: sampleImage }} />
            </div>
            <p className="title">Movies</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

class Banner2 extends Component {

  static propTypes = {
    isTablet: PropTypes.bool
  }

  static defaultProps = {
    isTablet: false
  }

  render() {
    return this.props.isTablet ? this.renderTablet() : this.renderDesktop();
  }

  renderTablet() {
    return (
      <div className="mobileBannerContainer">
        <div className="rowContainer">
          <h3 className="mobileHeader">Built for hunters,</h3>
          <div className="row">
            <h3 className="mobileHeader">by hunters</h3>
            <h3 className="mobileHeader highlight">&nbsp;since 1983.</h3>
          </div>
        </div>
      </div>
    );
  }

  renderDesktop() {
    return (
      <div className="bannerContainer">
        <div className="rowContainer">
          <h2 className="header3">Built for hunters, by hunters</h2>
          <h2 className="header3 highlight">&nbsp;since 1983.</h2>
        </div>
      </div>
    );
  }
}

export default Home;

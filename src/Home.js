import React, { Component } from 'react';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import { Link } from 'react-router';
import Button from './Buttons';
import FaPhone from 'react-icons/lib/fa/phone';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o';
import FaComment from 'react-icons/lib/fa/comment-o';
import FaUser from 'react-icons/lib/fa/user';
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
        <div className="footer">
          <h3 className="contactHeader">Contact us</h3>
          <div className="horizontalRule"/>
          <div className="contactInfoContainer">
            <div className="leftContents">
              <h3 className="contactSubheader">Berry Game Calls</h3>
              <div className="callDiv">
                <FaPhone className="phoneIcon"/>
                <p className="contactText">Monday-Friday 9am-5pm PST</p>
              </div>
              <p className="addressText">1 (800) 434-2855 </p>
              <p className="addressText">1 (509) 299-5524 </p>
              <div className="callDiv">
                <FaEnvelope className="phoneIcon" />
                <p className="contactText">PO Box 416 / 219 S. Lefevre</p>
              </div>
              <p className="addressText">Medical Lake, WA 99022</p>
            </div>
            <div className="rightContents">
              <h3 className="contactSubheader">Send us a message</h3>
              <div className="callDiv">
                <FaUser className="phoneIcon" />
                <input className="singleLineInput"
                       placeholder="Name"/>
              </div>
              <div className="callDiv">
                <FaEnvelopeO className="phoneIcon" />
                <input className="singleLineInput"
                       placeholder="Email"/>
              </div>
              <div className="callDiv">
                <FaComment className="phoneIcon" />
                <textarea className="textArea"
                          placeholder="Message"/>
              </div>
              <div className="sendDiv">
                <Button text="send"/>
              </div>
            </div>
          </div>
        </div>
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
                    price="$34.50"
                    link="/products/:productName"/>
      </div>
    </div>
  );
}

function FeaturedItem({ title, price, link }) {
  return (
    <div className="featuredItem">
    <Link to={link} className="link">
      <div className="detailsContainer">
        <div className="infoContainer">
          <h2 className="smallProductTitle">{title}</h2>
          <h3 className="smallProductPrice">{price}</h3>
        </div>
      </div>
      </Link>
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

export default Home;

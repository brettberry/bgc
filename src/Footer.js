import React, { Component } from 'react';
import FaPhone from 'react-icons/lib/fa/phone';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o';
import FaComment from 'react-icons/lib/fa/comment-o';
import FaUser from 'react-icons/lib/fa/user';
import FaFacebook from 'react-icons/lib/fa/facebook-official';
import FaYoutube from 'react-icons/lib/fa/youtube-play';
import FaCopyright from 'react-icons/lib/fa/copyright';
import Button from './Buttons';
import './buttons.styles.scss';
import './footer.styles.scss';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <h3 className="contactHeader">Contact us</h3>
        <div className="horizontalRule"/>
        <div className="contactInfoContainer">
          <LeftSide />
          <RightSide />
        </div>
        <Copyright />
      </div>
    );
  }
}

function LeftSide() {
  return (
    <div className="leftContents">
      <h3 className="subheader">Berry Game Calls</h3>
      <div className="itemContainer">
        <FaPhone className="icon" />
        <p className="item">Monday-Friday 9am-5pm PST</p>
      </div>
      <p className="text">1 (800) 434-2855 </p>
      <p className="text">1 (509) 299-5524 </p>
      <div className="itemContainer">
        <FaEnvelope className="icon" />
        <p className="item">PO Box 416 / 219 S. Lefevre</p>
      </div>
      <p className="text">Medical Lake, WA 99022</p>
      <div className="itemContainer">
        <FaFacebook className="icon" />
        <p className="item">Follow us on Facebook</p>
      </div>
      <div className="itemContainer">
        <FaYoutube className="icon" />
        <p className="item">Subscribe to our Youtube Channel</p>
      </div>
    </div>
  );
}

function RightSide() {
  return (
    <div className="rightContents">
      <h3 className="subheader">Send us a message</h3>
      <div className="itemContainer">
        <FaUser className="icon" />
        <input className="input"
               placeholder="Name"/>
      </div>
      <div className="itemContainer">
        <FaEnvelopeO className="icon" />
        <input className="input"
               placeholder="Email"/>
      </div>
      <div className="itemContainer">
        <FaComment className="icon" />
        <textarea className="textArea"
                  placeholder="Message"/>
      </div>
      <div className="sendContainer">
        <Button text="send"/>
      </div>
    </div>
  );
}

function Copyright() {
  return (
    <div className="copyrightContainer">
      <FaCopyright className="icon" />
      <p className="copyright">2016 Brett Berry</p>
    </div>
  );
}

export default Footer;

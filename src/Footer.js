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
      <div className="callDiv">
        <FaFacebook className="phoneIcon" />
        <p className="contactText">Follow us on Facebook</p>
      </div>
      <div className="callDiv">
        <FaYoutube className="phoneIcon" />
        <p className="contactText">Subscribe to our Youtube Channel</p>
      </div>
    </div>
  );
}

function RightSide() {
  return (
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
  );
}

function Copyright() {
  return (
    <div className="copyrightContainer">
      <FaCopyright className="copyrightIcon" />
      <p className="copyright">2016 Brett Berry</p>
    </div>
  );
}

export default Footer;

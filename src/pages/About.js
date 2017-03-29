import React, { Component } from 'react';
import './about.styles.scss';

class About extends Component {
  render() {
    return (
      <div className="aboutContainer">
        <div className="aboutSection">
          <div className="aboutPhotoContainer">
            <div style={{ backgroundImage: 'url(/bgcHuntingPhotos/glen-elk-29.jpg)' }}
                 className="portrait"/>
            <span className="caption">Glen Berry with the cover bull from Bugling With Success, 1985</span>
          </div>
          <div className="textContainer">
            <h2 className="aboutTitle">Beginnings</h2>
            <div className="line"/>
            <p className="aboutText">Glen Berry name is synonymous with elk calling. As of 2016, he shot his 55 bull elk with Archery equipment. Glen produced his first VHS tape in 1985 called ‘Bugling with success.’ Montana guide schools used this tape and any new elk video’s he released to help teach their students Glen’s elk calling techniques. Glen has produced programming for the Outdoor Channel, Sportsman Channel, Men’s channel and has been a big part in Berry Game Calls VHS and DVD Bowhunting Series. </p>
          </div>
        </div>
      <div className="aboutSection">
        <div className="textContainer">
          <h2 className="aboutTitle">Over the years</h2>
          <div className="line"/>
          <p className="aboutText">Glen Berry name is synonymous with elk calling. As of 2016, he shot his 55th bull elk with Archery equipment. Glen produced his first VHS tape in 1985 called ‘Bugling with success.’ Montana guide schools used this tape and any new elk video’s he released to help teach their students Glen’s elk calling techniques. Glen has produced programming for the Outdoor Channel, Sportsman Channel, Men’s channel and has been a big part in Berry Game Calls VHS and DVD Bowhunting Series. </p>
        </div>
        <div className="aboutPhotoContainer">
          <div style={{ backgroundImage: 'url(/bgcHuntingPhotos/chad-elk-5.jpg)' }}
               className="portrait"/>
          <span className="caption">Glen Berry with son Chad's first bull elk, 1995</span>
        </div>
      </div>
      <div className="aboutSection">
        <div className="aboutPhotoContainer">
          <div style={{ backgroundImage: 'url(/bgcHuntingPhotos/brett-glen-deer.jpg)' }}
               className="landscape"/>
          <span className="caption">Glen Berry with daughter Brett showing off their whitetails, 2012</span>
        </div>
        <div className="textContainer">
          <h2 className="aboutTitle">Today</h2>
          <div className="line"/>
          <p className="aboutText">Glen Berry name is synonymous with elk calling. As of 2016, he shot his 55 bull elk with Archery equipment. Glen produced his first VHS tape in 1985 called ‘Bugling with success.’ Montana guide schools used this tape and any new elk video’s he released to help teach their students Glen’s elk calling techniques. Glen has produced programming for the Outdoor Channel, Sportsman Channel, Men’s channel and has been a big part in Berry Game Calls VHS and DVD Bowhunting Series. </p>
        </div>
      </div>
    </div>
    );
  }
}

export default About;

import React, { Component } from 'react';
import Button from '../Buttons';
import './demos.styles.scss';
import { Link } from 'react-router';

class Demos extends Component {
  render() {
    return (
      <div className="demosContainer">
        <DemoObject title="How to Call Elk with the X-Series Mouth Reeds"
                    description="Glen Berry shows how to make bull and cow elk sounds with the new X-Series mouth reeds from Berry Game Calls. This is a short clip from the Elk Hunters Training Day DVD."
                    link="products/tags/x-series" />
        <DemoObject title="How to Use the Berry Thunder Bugle"
                    description="Glen Berry demonstrates how to use the Berry Thunder Bugle Elk Call."
                    link="products/bugles/thunder-bugle" />
        <DemoObject title="Elk Hunters Training Day 2: Against the Odds Trailer"
                    description="“Elk Hunters Training Day 2: Against the Odds” is the 2nd in a series of DVD’s by Berry Game Calls. Here are a few highlights from the DVD. Chad and Glen Berry take 4 bulls in this action packed DVD while bowhunting in the Northwest’s backcountry. Glen will also share tips on calling elk in the wild! A must have, entertaining instructional DVD! "
                    link="products/dvds/training-day-2" />
        <DemoObject title="Elk Hunters Training Day Trailer"
                    description="Join Glen Berry on exciting do-it-yourself bowhunts for rocky mountain elk in Oregon, Idaho and Wyoming in this 60 minute instructional DVD. With each encounter, Glen will teach the techniques he uses to coax these bulls into close range. With the camera over-the-shoulder, watch as Glen arrows a giant herd bull! This is an entertaining and instructional DVD that will help make you a better elk hunter. 60 Minutes – DVD"
                    link="products/dvds/training-day" />
        <DemoObject title="Speedgoats Trailer"
                    description="Watch as Ray Bunney and Glen Berry archery hunt for big antelope bucks in Montana on a do-it-yourself Bow hunt. This segment is from the DVD Speed Goats by Berry game calls."
                    link="products/dvds/speedgoats" />
        <DemoObject title="Bowhunting Turkey in Washington"
                    description="Glen Berry of Berry Game Calls bowhunts for merriam turkey in Washington state. Watch this exciting call in with 2 camera angles."
                    link="products/dvds/northwest-gobblers" />
        <DemoObject title="Turkey Hunt with Chad Berry"
                    description="Chad Berry bowhunts for turkey in Washington state."
                    link="products/dvds/northwest-gobblers" />
      </div>
    );
  }
}

function DemoObject({ title, description, link }) {
  return (
    <div className="demoVideoContainer">
      <div className="videoThumbnail" />
      <div className="vidDetailsContainer">
        <h3 className="videoTitle">{title}</h3>
        <p className="videoDescription">{description}</p>
        <div className="demoButtonsContainer">
          <Button text="Watch" />
          <Link to={link} className="link">
            <Button text="Shop" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Demos;

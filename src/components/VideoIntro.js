import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import './videoIntro.styles.scss';

class VideoIntro extends Component {

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
    const frameWidth = screenWidth;
    const frameHeight = frameWidth * 0.5625;
    this.setState({ frameWidth, frameHeight });
  }

  render() {
    const { frameWidth, frameHeight } = this.state;
    return (
      <div className="videoIntroContainer">
        <h1 className="intro">For over three decades,</h1>
        <h1 className="tagline">Glen Berry and his team of experts have equipped hunters with the calls they need to be successful in the field.</h1>
        <h1 className="tagline2">For us it's more than hunting, it's a legacy.</h1>
        <Link to="/about" className="storyLink">
          <div className="storyButton">
            <p className="ourStory">This is Our Story</p>
          </div>
        </Link>
        <div className="videoOverlay">
          <div className="bottomStripe"/>
        </div>
        <iframe width={frameWidth}
                height={frameHeight}
                src="https://www.youtube.com/embed/aMWR4UQQz5k?autoplay=1&showinfo=0&controls=0&start=46&end=143&loop=1&playlist=aMWR4UQQz5k"
                frameBorder="0"
                allowFullScreen/>
      </div>
    );
  }
}

export default VideoIntro;

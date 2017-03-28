import React, { Component } from 'react';
import classnames from 'classnames';
import $ from 'jquery';
import './videoIntro.styles.scss';

class VideoIntro extends Component {

  state = {
    frameWidth: 0,
    frameHeight: 0,
    showOpaqueOverlay: true,
    moveLogo: false
  }

  constructor(props) {
    super(props);
    this._updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    $(window).on('resize', this._updateDimensions);
    this.timeout = setTimeout(this.hideOpaqueOverlay.bind(this), 3000);
    this.logoTimout = setTimeout(this.moveLogo.bind(this), 2000);
  }

  componentWillUnmount() {
    $(window).off('resize', this._updateDimensions);
    clearTimeout(this.timeout);
    clearTimeout(this.logoTimout);
  }

  updateDimensions() {
    const screenWidth = $(window).width();
    const frameWidth = screenWidth;
    const frameHeight = frameWidth * 0.5625;
    this.setState({ frameWidth, frameHeight });
  }

  moveLogo() {
    this.setState({ moveLogo: true });
  }

  hideOpaqueOverlay() {
    this.setState({ showOpaqueOverlay: false });
  }

  render() {
    const { frameWidth, frameHeight, showOpaqueOverlay, moveLogo } = this.state;
    return (
      <div className="videoIntroContainer">
        <div style={{ backgroundImage: 'url(/images/bgc_logo.png)' }}
             className={classnames('logoImage', moveLogo && 'moveLogo')}/>
        <div className={classnames('videoOverlay', showOpaqueOverlay && 'opaqueOverlay')}>
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

import React, { Component } from 'react';
import Button from './Buttons';
import data from './data.json';
import './HomePageDemo.styles.scss';
import { ProductCollection } from './models';
import { Link } from 'react-router';
import $ from 'jquery';

const products = new ProductCollection(data.products);

class Demo extends Component {

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
    const frameWidth = screenWidth * 0.75;
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

export default Demo;

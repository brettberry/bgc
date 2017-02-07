import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import { DemosCollection } from '../models';
import data from '../data.json';
import Button from '../Buttons';
import './demos.styles.scss';

const videos = new DemosCollection(data.demos);

class Demos extends Component {

  render() {
    const xSeriesDemo = videos.findByTitle('reeds-demo');
    const bugleDemo = videos.findByTitle('bugle-demo');
    const trainingDay2Demo = videos.findByTitle('training-day-2-demo');
    const trainingDayDemo = videos.findByTitle('training-day-demo');
    const turkeyDemo1 = videos.findByTitle('turkey-demo-1');
    const turkeyDemo2 = videos.findByTitle('turkey-demo-2');

    return (
      <div className="demosContainer">
        <DemoObject title={xSeriesDemo.getTitle()}
                    description={xSeriesDemo.getDescription()}
                    link={xSeriesDemo.getPath()}
                    image={xSeriesDemo.getImage()}
                    video={xSeriesDemo.getUrl()} />
        <DemoObject title={bugleDemo.getTitle()}
                    description={bugleDemo.getDescription()}
                    link={bugleDemo.getPath()}
                    image={bugleDemo.getImage()}
                    video={bugleDemo.getUrl()} />
        <DemoObject title={trainingDay2Demo.getTitle()}
                    description={trainingDay2Demo.getDescription()}
                    link={trainingDay2Demo.getPath()}
                    image={trainingDay2Demo.getImage()}
                    video={trainingDay2Demo.getUrl()} />
        <DemoObject title={trainingDayDemo.getTitle()}
                    description={trainingDayDemo.getDescription()}
                    link={trainingDayDemo.getPath()}
                    image={trainingDayDemo.getImage()}
                    video={trainingDayDemo.getUrl()} />
        <DemoObject title={turkeyDemo1.getTitle()}
                    description={turkeyDemo1.getDescription()}
                    link={turkeyDemo1.getPath()}
                    image={turkeyDemo1.getImage()}
                    video={turkeyDemo1.getUrl()} />
        <DemoObject title={turkeyDemo2.getTitle()}
                    description={turkeyDemo2.getDescription()}
                    link={turkeyDemo2.getPath()}
                    image={turkeyDemo2.getImage()}
                    video={turkeyDemo2.getUrl()} />
      </div>
    );
  }
}

  class DemoObject extends Component {

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
      const frameWidth = screenWidth * 0.8;
      const frameHeight = frameWidth * 0.5625;
      this.setState({ frameWidth, frameHeight });
    }

    render() {
      const { title, description, link, video } = this.props;
      const { frameWidth, frameHeight } = this.state;

      return (
        <div className="videoContainer">
          <div className="titleContainer">
            <h3 className="title">{title}</h3>
            <Link to={link} className="shopLink">
              <Button text="Shop" className="shopButton" />
            </Link>
          </div>
          <iframe width={frameWidth} height={frameHeight} src={video} frameBorder="0" allowFullScreen />
          <p className="description">{description}</p>
        </div>
      );
    }
  }

  export default Demos;

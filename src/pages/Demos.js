import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import map from 'lodash/map';

import { DemosCollection } from '~/models';
import data from '~/data.json';
import Button from '~/components/Buttons';
import './demos.styles.scss';

const videos = new DemosCollection(data.demos);

class Demos extends Component {

  render() {
    const titles = ['reeds-demo', 'bugle-demo', 'training-day-2-demo',
                    'training-day-demo', 'turkey-demo-1', 'turkey-demo-2'];
    const demos = videos.findAllByTitles(titles);

    return (
      <div className="demosContainer">
      {map(demos.toArray(), demo => {
          return (
              <DemoObject title={demo.getTitle()}
                          description={demo.getDescription()}
                          link={demo.getPath()}
                          image={demo.getImage()}
                          video={demo.getUrl()}
                          key={demo.getShortTitle()}/>
          );
      })}
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
            <Link to={link} className="shopBGCLink">
              <Button text="Shop" className="shopButton"/>
            </Link>
          </div>
          <iframe width={frameWidth}
                  height={frameHeight}
                  src={video}
                  frameBorder="0"
                  allowFullScreen/>
          <p className="description">{description}</p>
        </div>
      );
    }
  }

  export default Demos;

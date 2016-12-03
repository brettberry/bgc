import React, { Component } from 'react';
import { Link } from 'react-router';
import data from '../data.json';
import { DemosCollection } from '../models';
import Button from '../Buttons';

import './mobileDemos.styles.scss';

const videos = new DemosCollection(data.demos);

class MobileDemos extends Component {
  render() {
    const xSeriesDemo = videos.findByTitle('reeds-demo');
    const bugleDemo = videos.findByTitle('bugle-demo');
    const trainingDay2Demo = videos.findByTitle('training-day-2-demo');
    const trainingDayDemo = videos.findByTitle('training-day-demo');
    // const speedgoatsDemo = videos.findByTitle('speedgoats-demo');
    const turkeyDemo1 = videos.findByTitle('turkey-demo-1');
    const turkeyDemo2 = videos.findByTitle('turkey-demo-2');

    return (
      <div className="demosContainer">
        <MobileDemoObject title={xSeriesDemo.getTitle()}
                    description={xSeriesDemo.getDescription()}
                    link={xSeriesDemo.getPath()}
                    image={xSeriesDemo.getImage()}
                    video={xSeriesDemo.getUrl()} />
        <MobileDemoObject title={bugleDemo.getTitle()}
                    description={bugleDemo.getDescription()}
                    link={bugleDemo.getPath()}
                    image={bugleDemo.getImage()}
                    video={bugleDemo.getUrl()} />
        <MobileDemoObject title={trainingDay2Demo.getTitle()}
                    description={trainingDay2Demo.getDescription()}
                    link={trainingDay2Demo.getPath()}
                    image={trainingDay2Demo.getImage()}
                    video={trainingDay2Demo.getUrl()} />
        <MobileDemoObject title={trainingDayDemo.getTitle()}
                    description={trainingDayDemo.getDescription()}
                    link={trainingDayDemo.getPath()}
                    image={trainingDayDemo.getImage()}
                    video={trainingDayDemo.getUrl()} />
        {/* <DemoObject title={speedgoatsDemo.getTitle()}
                    description={speedgoatsDemo.getDescription()}
                    link={speedgoatsDemo.getPath()}
                    image={speedgoatsDemo.getImage()}
                    video={speedgoatsDemo.getUrl()} /> */}
        <MobileDemoObject title={turkeyDemo1.getTitle()}
                    description={turkeyDemo1.getDescription()}
                    link={turkeyDemo1.getPath()}
                    image={turkeyDemo1.getImage()}
                    video={turkeyDemo1.getUrl()} />
        <MobileDemoObject title={turkeyDemo2.getTitle()}
                    description={turkeyDemo2.getDescription()}
                    link={turkeyDemo2.getPath()}
                    image={turkeyDemo2.getImage()}
                    video={turkeyDemo2.getUrl()} />
      </div>
    );
  }
}

  class MobileDemoObject extends Component {

    render() {
      const { title, description, link, video } = this.props;

      return (
        <div className="videoContainer">
          <div className="thumbnail" />
          <div className="detailsContainer">
            <h3 className="title">{title}</h3>
            <p className="description">{description}</p>
            <div className="buttonContainer">
              <Button text="Watch" className="watchButton" />
              <Link to={link} className="link">
                <Button text="Shop" className="shopButton" />
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }

  export default MobileDemos;

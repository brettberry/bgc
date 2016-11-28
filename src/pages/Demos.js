import React, { Component } from 'react';
import Button from '../Buttons';
import './demos.styles.scss';
import { Link } from 'react-router';
import Modal from 'simple-react-modal';
import clickOutside from 'react-click-outside';
import $ from 'jquery';
import data from '../data.json';
import { DemosCollection } from '../models';

const videos = new DemosCollection(data.demos);

class Demos extends Component {
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
        {/* <DemoObject title={speedgoatsDemo.getTitle()}
                    description={speedgoatsDemo.getDescription()}
                    link={speedgoatsDemo.getPath()}
                    image={speedgoatsDemo.getImage()}
                    video={speedgoatsDemo.getUrl()} /> */}
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
    showModal: false
  }

  render() {
    const { title, description, link, video } = this.props;
    const { showModal } = this.state;
    const ModalComponent = clickOutside(ModalContents);
    return (
      <div className="demoVideoContainer">
        <div className="videoThumbnail"
             style={this.getThumbnailStyle()}
             onClick={() => this.setState({ showModal: !showModal })} />
        <div className="vidDetailsContainer">
          <h3 className="videoTitle">{title}</h3>
          <p className="videoDescription">{description}</p>
          <div className="demoButtonsContainer">
            <Button text="Watch" onClick={() => this.setState({ showModal: !showModal })} />
            <Modal show={showModal}
                   containerClassName="videoModal">
              <ModalComponent video={video} closeModal={() => this.setState({ showModal: false })} />
            </Modal>
            <Link to={link} className="link">
              <Button text="Shop" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  getThumbnailStyle() {
    return {
      backgroundImage: `url(${this.props.image})`
    };
  }
}

class ModalContents extends Component {

  state = {
    frameWidth: 0,
    frameHeight: 0
  }

  constructor(props) {
    super(props);
    this._updateDimensions = this.updateDimensions.bind(this);
  }

  handleClickOutside() {
    this.props.closeModal();
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
    const frameWidth = screenWidth * 0.6;
    const frameHeight = frameWidth * 0.5625;
    this.setState({ frameWidth, frameHeight });
  }

  render() {
    const { frameWidth, frameHeight } = this.state;
    return (
      <div>
        <iframe height={frameHeight} width={frameWidth} src={this.props.video} frameBorder="0" allowFullScreen></iframe>
      </div>
    );
  }
}

export default Demos;

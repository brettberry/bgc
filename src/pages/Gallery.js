import React, { Component } from 'react';
import Modal from 'simple-react-modal';
import clickOutside from 'react-click-outside';
import map from 'lodash/map';
import MdClose from 'react-icons/lib/md/close';
import './gallery.styles.scss';

const images = ['url(/samplePhotos/deer.jpg)',
               'url(/samplePhotos/fox.jpg)',
               'url(/samplePhotos/scenery.jpg)',
               'url(/samplePhotos/deer.jpg)',
               'url(/samplePhotos/fox.jpg)',
               'url(/samplePhotos/scenery.jpg)',
               'url(/samplePhotos/deer.jpg)',
               'url(/samplePhotos/fox.jpg)',
               'url(/samplePhotos/scenery.jpg)',
               'url(/samplePhotos/deer.jpg)',
               'url(/samplePhotos/fox.jpg)',
               'url(/samplePhotos/scenery.jpg)'];

class PhotoGallery extends Component {

  state = {
    showModal: false
  }

  getPhoto() {
    return (
      map(images, (image, key) =>
        <div className="photo"
             style={{ backgroundImage: image }}
             onClick={() => this.setState({ showModal: true })}
             key={key} />)
      );
  }

  render() {
    const ModalComponent = clickOutside(PhotoModalContents);
    const { showModal } = this.state;
    return (
      <div>
        <div className="photoContainer">{this.getPhoto()}</div>
        <Modal show={showModal}>
          <ModalComponent closeModal={() => this.setState({ showModal: false })} />
        </Modal>
      </div>
    );
  }
}

class PhotoModalContents extends Component {
  //
  // state = {
  //   frameWidth: 0,
  //   frameHeight: 0
  // }

  // constructor(props) {
  //   super(props);
  //   this._updateDimensions = this.updateDimensions.bind(this);
  // }

  handleClickOutside() {
    this.props.closeModal();
  }

  // componentDidMount() {
  //   this.updateDimensions();
  //   $(window).on('resize', this._updateDimensions);
  // }
  //
  // componentWillUnmount() {
  //   $(window).off('resize', this._updateDimensions);
  // }
  //
  // updateDimensions() {
  //   const screenWidth = $(window).width();
  //   const frameWidth = screenWidth * 0.6;
  //   const frameHeight = frameWidth * 0.5625;
  //   this.setState({ frameWidth, frameHeight });
  // }

  render() {
    // const { frameWidth, frameHeight } = this.state;
    return (
      <div>
        <MdClose className="exit" />
        <div className="photoView" style={{ backgroundImage: images[0] }} />
      </div>
    );
  }
}

export default PhotoGallery;

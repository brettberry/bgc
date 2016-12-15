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
    showModal: false,
    index: 0
  }

  getPhotos() {
    return (
      map(images, (image, key) =>
        <div className="photo"
             style={{ backgroundImage: image }}
             onClick={() => this.setState({ showModal: true, index: key })}
             key={key} />)
    );
  }

  render() {
    const ModalComponent = clickOutside(PhotoModalContents);
    const { showModal } = this.state;
    return (
      <div>
        <div className="photoContainer">{this.getPhotos()}</div>
        <Modal show={showModal} containerClassName="photoModal">
          <ModalComponent closeModal={() => this.setState({ showModal: false })} index={this.state.index} />
        </Modal>
      </div>
    );
  }
}

class PhotoModalContents extends Component {

  handleClickOutside() {
    this.props.closeModal();
  }

  render() {
    const { index } = this.props;
    return (
      <div className="modalContainer">
        <MdClose className="exit" />
        <div className="modalContents">
          <div className="photoView" style={{ backgroundImage: images[index] }} />
          <div className="caption">Sample text</div>
        </div>
      </div>
    );
  }
}

export default PhotoGallery;

import React, { Component } from 'react';
import Modal from 'simple-react-modal';
import clickOutside from 'react-click-outside';
import map from 'lodash/map';
import MdClose from 'react-icons/lib/md/close';
import MDChevronLeft from 'react-icons/lib/md/chevron-left';
import MDChevronRight from 'react-icons/lib/md/chevron-right';

import BGCPhotoCollection from '~/models/BGCPhotoCollection';
import data from '~/data.json';
import './gallery.styles.scss';

const photos = new BGCPhotoCollection(data.photos);

class PhotoGallery extends Component {

  state = {
    showModal: false,
    index: 0
  }

  getPhotos() {
    return (
      map(photos.toArray(), (photo, key) =>
        <div className="photo"
             style={{ backgroundImage: `url(/bgcHuntingPhotos/${photo.getImageURL()})` }}
             onClick={() => this.setState({ showModal: true, index: key })}
             key={key}/>)
    );
  }

  render() {
    const ModalComponent = clickOutside(PhotoModalContents);
    const { showModal, index } = this.state;
    return (
      <div>
        <div className="galleryHeaderContainer">
            <h1 className="galleryHeader">Bowhunting</h1>
            <h1 className="gallerySubheader">A Family Tradition</h1>
        </div>
        <div className="photoContainer">{this.getPhotos()}</div>
        <div className="welcomeContainer">
            <h1 className="welcomeHeader">Welcome to the family</h1>
        </div>
        <Modal show={showModal}
               containerClassName="photoModal"
               closeOnOuterClick={false}>
          <ModalComponent closeModal={() => this.setState({ showModal: false })}
                          index={this.state.index}
                          photoLeft={() => this.setState({ index: (index - 1) % photos.length })}
                          photoRight={() => this.setState({ index: (index + 1) % photos.length })}/>
        </Modal>
      </div>
    );
  }
}

class PhotoModalContents extends Component {

  handleClickOutside() {
    this.props.closeModal();
  }

  getPhotoForModal(index) {
      const photoArray = photos.toArray();
      const photoURLArray = map(photoArray, (photo, key) =>
        `url(/bgcHuntingPhotos/${photo.getImageURL()})`
      );
      return photoURLArray[Math.abs(index)];
  }

  getHunterDetails(index) {
      const photoArray = photos.toArray();
      const hunterArray = map(photoArray, (photo, key) =>
        `${photo.getHunter()}`
      );
      return hunterArray[Math.abs(index)];
  }

  render() {
    const { index } = this.props;
    return (
      <div className="modalContainer">
        <MdClose className="exit" onClick={this.props.closeModal}/>
        <div className="modalContents">
          <div className="photoView" style={{ backgroundImage: this.getPhotoForModal(index) }}/>
          <div className="caption">{this.getHunterDetails(index)}</div>
        </div>
        <MDChevronLeft className="photoLeft" onClick={this.props.photoLeft}/>
        <MDChevronRight className="photoRight" onClick={this.props.photoRight}/>
      </div>
    );
  }
}

export default PhotoGallery;

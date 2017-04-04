import React, { Component, PropTypes } from 'react';
import Modal from 'simple-react-modal';
import clickOutside from 'react-click-outside';
import map from 'lodash/map';
import MdClose from 'react-icons/lib/md/close';
import MDChevronLeft from 'react-icons/lib/md/chevron-left';
import MDChevronRight from 'react-icons/lib/md/chevron-right';

import BGCPhotoCollection from '~/models/BGCPhotoCollection';
import './photoGallery.styles.scss';


class PhotoGallery extends Component {

  static propsTypes = {
    photos: PropTypes.instanceOf(BGCPhotoCollection).isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    endText: PropTypes.string
  }

  state = {
    showModal: false,
    index: 0
  }

  getPhotos() {
    return (
      map(this.props.photos.toArray(), (photo, key) =>
        <div className="photo"
             style={{ backgroundImage: `url(/bgcHuntingPhotos/${photo.getImageURL()})` }}
             onClick={() => this.setState({ showModal: true, index: key })}
             key={key}/>)
    );
  }

  render() {
    // eslint-disable-next-line
    const ModalComponent = clickOutside(PhotoModalContents);
    const { showModal, index } = this.state;
    const { photos } = this.props;
    return (
      <div>
        <div className="galleryHeaderContainer">
            <h1 className="galleryHeader">{this.props.title}</h1>
            <h1 className="gallerySubheader">{this.props.subtitle}</h1>
        </div>
        <div className="photoContainer">{this.getPhotos()}</div>
        {/* <div className="welcomeContainer">
            <h1 className="welcomeHeader">{this.props.endText}</h1>
        </div> */}
        <Modal show={showModal}
               containerClassName="photoModal"
               closeOnOuterClick={false}>
          <ModalComponent photos={this.props.photos}
                          closeModal={() => this.setState({ showModal: false })}
                          index={this.state.index}
                          photoLeft={() => this.setState({ index: (index - 1) % photos.length })}
                          photoRight={() => this.setState({ index: (index + 1) % photos.length })}/>
        </Modal>
      </div>
    );
  }
}

class PhotoModalContents extends Component {

  static propTypes = {
    photos: PropTypes.instanceOf(BGCPhotoCollection),
    closeModal: PropTypes.func,
    index: PropTypes.number.isRequired,
    photoLeft: PropTypes.func,
    photoRight: PropTypes.func
  }

  handleClickOutside() {
    this.props.closeModal();
  }

  getPhotoForModal(index) {
      const photoArray = this.props.photos.toArray();
      const photoURLArray = map(photoArray, (photo, key) =>
        `url(/bgcHuntingPhotos/${photo.getImageURL()})`
      );
      return photoURLArray[Math.abs(index)];
  }

  getHunterDetails(index) {
      const photoArray = this.props.photos.toArray();
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
        </div>
        <MDChevronLeft className="photoLeft" onClick={this.props.photoLeft}/>
        <MDChevronRight className="photoRight" onClick={this.props.photoRight}/>
      </div>
    );
  }
}

export default PhotoGallery;

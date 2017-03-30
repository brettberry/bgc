import React, { Component } from 'react';
import map from 'lodash/map';
import take from 'lodash/take';
import { Link } from 'react-router';
import MdChevronRight from 'react-icons/lib/md/chevron-right';

import BGCPhotoCollection from '~/models/BGCPhotoCollection';
import data from '~/data.json';
import './galleryFeature.styles.scss';

const photos = new BGCPhotoCollection(data.photos);

class GalleryFeature extends Component {
  getPhotos() {
    const firstTwenty = take(photos.toArray(), 100);
    return (
      map(firstTwenty, (photo, key) =>
        <div className="miniPhoto"
             style={{ backgroundImage: `url(/bgcHuntingPhotos/${photo.getImageURL()})` }}
             key={key}/>)
    );
  }

  render() {
    return (
      <div>
        <div className="photoOverlay"/>
        <div className="galleryInfoContainer">
          <h1 className="galleryFeatureHeader">Let The Results speak for themselves</h1>
          <Link to="/gallery" className="storyLink">
            <div className="photosButton">
              <p className="trophyPhotos">Trophy Photos</p>
              <MdChevronRight className="chevRight"/>
            </div>
          </Link>
        </div>
        <div className="miniPhotoContainer">{this.getPhotos()}</div>
      </div>
    );
  }
}

export default GalleryFeature;

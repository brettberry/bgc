import React, { Component } from 'react';
import map from 'lodash/map';
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

class Gallery extends Component {
  render() {
    return (
      <div>
        <Photo />
      </div>
    );
  }
}

class Photo extends Component {

  GetPhoto() {
    return (
      map(images, (image, key) =>
        <div className="photo" style={{ backgroundImage: image }} key={key} />)
      );
  }

  render() {
    return (
      <div className="photoContainer">{this.GetPhoto()}</div>
    );
  }
}

export default Gallery;

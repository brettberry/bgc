import React, { Component } from 'react';
import './gallery.styles.scss';

class Gallery extends Component {
  render() {
    return (
      <div>
        <GalleryItem />
      </div>
    );
  }
}

function GalleryItem() {
  return (
    <div className="galleryRow">
      <div className="imageContainer"></div>
    </div>
  );
}

export default Gallery;

import React, { Component } from 'react';
import './gallery.styles.scss';

class Gallery extends Component {
  render() {
    return (
      <div>
        <div className="photoCategories">
          <h3 className="animal">Elk</h3>
          <h3 className="animal">Deer</h3>
          <h3 className="animal">Bear</h3>
          <h3 className="animal">Antelope</h3>
          <h3 className="animal">Turkey</h3>
          <h3 className="animal">Other</h3>
        </div>
        <GalleryRow />
        <GalleryRow />
        <GalleryRow />
        <GalleryRow />
        <GalleryRow />
      </div>
    );
  }
}

function GalleryRow() {
  return (
    <div className="galleryRow">
      <div className="imageContainer">
        <div className="overlayContainer">
          <h3 className="hunter">Chad Berry</h3>
          <h3 className="details">Washington Archery Elk</h3>
        </div>
      </div>
      <div className="imageContainer">
        <div className="overlayContainer">
          <h3 className="hunter">Chad Berry</h3>
          <h3 className="details">175" Pope & Young</h3>
          <h3 className="details">Washington Whitetail Deer</h3>
        </div>
      </div>
      <div className="imageContainer">
        <div className="overlayContainer">
          <h3 className="hunter">Chad Berry</h3>
          <h3 className="details">175" Pope & Young</h3>
          <h3 className="details">Washington Whitetail Deer</h3>
        </div>
      </div>
      <div className="imageContainer">
        <div className="overlayContainer">
          <h3 className="hunter">Chad Berry</h3>
          <h3 className="details">175" Pope & Young</h3>
          <h3 className="details">Washington Whitetail Deer</h3>
        </div>
      </div>
    </div>
  );
}

export default Gallery;

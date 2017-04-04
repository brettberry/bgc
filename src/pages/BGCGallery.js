import React, { Component } from 'react';
import BGCPhotoCollection from '~/models/BGCPhotoCollection';
import PhotoGallery from '~/components/PhotoGallery';
import data from '~/data.json';

const photos = new BGCPhotoCollection(data.photos);

class BGCGallery extends Component {
  render() {
    return (
      <PhotoGallery photos={photos}
                    title="Berry Game Calls"
                    subtitle="Sound like the real thing"
                    endText="Welcome to the family"/>
    );
  }
}

export default BGCGallery;

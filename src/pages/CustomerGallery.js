import React, { Component } from 'react';
import BGCPhotoCollection from '~/models/BGCPhotoCollection';
import PhotoGallery from '~/components/PhotoGallery';
import data from '~/data.json';

const photos = new BGCPhotoCollection(data.customerPhotos);

class CustomerGallery extends Component {

  render() {
    return (
      <PhotoGallery photos={photos}
                    title="Berry Game Calls"
                    subtitle="Sound like the real thing"
                    endText="Sound like the real thing"/>
    );
  }
}

export default CustomerGallery;

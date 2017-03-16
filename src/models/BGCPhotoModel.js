import Model from './Model';

export default class BGCPhotoModel extends Model {

  getImageID() {
    return this.get('imageId');
  }

  getImageURL() {
    return this.get('imageURL');
  }

  getHunter() {
      return this.get('hunter');
  }

  getSpecies() {
      return this.get('species');
  }

  getYear() {
      return this.get('year');
  }

  getDetails() {
      return this.get('details');
  }
}

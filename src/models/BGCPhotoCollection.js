import Collection from './Collection';
import BGCPhotoModel from './BGCPhotoModel';
import includes from 'lodash/includes';

export default class BGCPhotoCollection extends Collection {

  static ModelType = BGCPhotoModel

  findByImageID(imageId) {
    return this.find(item => item.getPathName() === imageId);
  }

  filterByHunter(hunter) {
    return this.filter(item => includes(item.getCategory(), hunter));
  }

  filterBySpecies(species) {
    return this.filter(item => includes(item.getCategory(), species));
  }
}

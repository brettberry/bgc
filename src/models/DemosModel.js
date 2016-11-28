import Model from './Model';

export default class DemosModel extends Model {

  getShortTitle() {
    return this.get('shortTitle');
  }

  getTitle() {
    return this.get('title');
  }

  getDescription() {
    return this.get('description');
  }

  getPath() {
    return this.get('path');
  }

  getImage() {
    return this.get('image');
  }

  getUrl() {
    return this.get('url');
  }
}

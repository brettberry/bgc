import Collection from './Collection';
import DemosModel from './DemosModel';

export default class DemosCollection extends Collection {

  static ModelType = DemosModel

  findByTitle(shortTitle) {
    return this.find(item => item.getShortTitle() === shortTitle);
  }
}

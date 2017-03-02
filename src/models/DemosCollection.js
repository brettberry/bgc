import Collection from './Collection';
import DemosModel from './DemosModel';
import includes from 'lodash/includes';

export default class DemosCollection extends Collection {

  static ModelType = DemosModel

  findByTitle(shortTitle) {
    return this.find(item => item.getShortTitle() === shortTitle);
  }

  findAllByTitles(shortTitles) {
      return this.filter(item => includes(shortTitles, item.getShortTitle()));
  }
}

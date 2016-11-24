import Collection from './Collection';
import ProductModel from './ProductModel';
import includes from 'lodash/includes';

export default class ProductCollection extends Collection {

  static ModelType = ProductModel

  findByPathName(pathName) {
    return this.find(item => item.getPathName() === pathName);
  }

  filterByCategory(category) {
    return this.filter(item => includes(item.getCategory(), category));
  }

  filterByTag(tag) {
    return this.filter(item => includes(item.getTags(), tag));
  }
}

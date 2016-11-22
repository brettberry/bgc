import Collection from './Collection';
import ProductModel from './ProductModel';

export default class ProductCollection extends Collection {

  static ModelType = ProductModel

  findByPathName(pathName) {
    return this.find(item => item.getPathName() === pathName);
  }
}

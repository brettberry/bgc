import Model from './Model';
import PriceModel from './PriceModel';

export default class ProductModel extends Model {

  constructor(data) {
    super(data);
    this.price = new PriceModel(this.get('price'));
  }

  getFullName() {
    return this.get('fullName');
  }

  getPathName() {
    return this.get('pathName');
  }

  getPrice() {
    return this.price;
  }

  getDescription() {
    return this.get('description');
  }

  getMedia() {
    return this.get('media');
  }
}

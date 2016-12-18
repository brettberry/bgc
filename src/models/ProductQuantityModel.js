import Model from './Model';
import ProductModel from './ProductModel';

export default class ProductQuantityModel extends Model {

  constructor(data) {
    super(data);
    this.product = new ProductModel(this.get('product'));
  }

  getQuantity() {
    return this.get('quantity') || 0;
  }

  getProduct() {
    return this.product;
  }

  getFullName() {
    return this.getProduct().getFullName();
  }

  addQuantity(newQuantity) {
    return this.setQuantity(this.getQuantity() + newQuantity);
  }

  setQuantity(quantity) {
    return this.set('quantity', quantity);
  }
}

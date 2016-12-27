import Model from './Model';
import ProductModel from './ProductModel';

export default class CartItemModel extends Model {

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

  getSubtotal() {
    return this.getProduct().getPriceAmount() * this.getQuantity();
  }

  getFullName() {
    return this.getProduct().getFullName();
  }

  getMedia() {
    return this.getProduct().getMedia();
  }

  addQuantity(newQuantity) {
    return this.setQuantity(this.getQuantity() + newQuantity);
  }

  setQuantity(quantity) {
    return this.set('quantity', quantity);
  }
}

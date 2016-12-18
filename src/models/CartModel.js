import Model from './Model';
import ProductQuantityCollection from './ProductQuantityCollection';

export default class CartModel extends Model {

  constructor(data) {
    super(data);
    this.productQuantities = new ProductQuantityCollection(this.get('productQuantities'));
  }

  getProductQuantities() {
    return this.productQuantities;
  }

  setProductQuantities(productQuantities) {
    return this.set('productQuantities', productQuantities);
  }

  addItems(product, quantity) {
    const productQuantities = this.getProductQuantities();
    const productQuantity = productQuantities.findProductQuantityByName(product.getFullName());
    if (productQuantity) {
      const newProductQuantity = productQuantity.addQuantity(quantity);
      const newProductQuantities = productQuantities.replaceProductQuantityByName(newProductQuantity);
      return this.setProductQuantities(newProductQuantities);
    }
    const newProductQuantities = productQuantities.addProductWithQuantity(product, quantity);
    return this.setProductQuantities(newProductQuantities);
  }
}

import Collection from './Collection';
import ProductQuantityModel from './ProductQuantityModel';

export default class ProductQuantityCollection extends Collection {

  static ModelType = ProductQuantityModel

  findProductQuantityByName(productName) {
    return this.find(product => product.getFullName() === productName);
  }

  replaceProductQuantityByName(productQuantity) {
    return this.map(item => {
      if (item.getFullName() === productQuantity.getFullName()) {
        return productQuantity;
      }
      return item;
    });
  }

  addProductWithQuantity(product, quantity) {
    return this.push(new ProductQuantityModel({ product: product, quantity: quantity }));
  }
}

import Collection from './Collection';
import CartItemModel from './CartItemModel';
import sumBy from 'lodash/sumBy';

export default class CartItemCollection extends Collection {

  static ModelType = CartItemModel

  findItemByName(productName) {
    return this.find(product => product.getFullName() === productName);
  }

  replaceItemByName(cartItem) {
    return this.map(item => {
      if (item.getFullName() === cartItem.getFullName()) {
        return cartItem;
      }
      return item;
    });
  }

  addProductWithQuantity(product, quantity) {
    return this.push(new CartItemModel({ product: product, quantity: quantity }));
  }

  addItem(product, quantity) {
    const item = this.findItemByName(product.getFullName());
    if (item) {
      const newItem = item.addQuantity(quantity);
      return this.replaceItemByName(newItem);
    }
    return this.addProductWithQuantity(product, quantity);
  }

  setItem(product, quantity) {
    const item = this.findItemByName(product.getFullName());
    const newItem = item.setQuantity(quantity);
    return this.replaceItemByName(newItem);
  }

  removeItem(product) {
    return this.filter(item => item.getFullName() !== product.getFullName());
  }

  getCartQuantity() {
    return sumBy(this.toArray(), (item) => item.getQuantity());
  }
}

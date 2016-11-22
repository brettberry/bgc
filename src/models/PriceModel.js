import Model from './Model';

export default class PriceModel extends Model {

  getAmount() {
    return this.get('amount');
  }

  getDiscount() {
    return this.get('discount');
  }
}

import Model from './Model';

export default class ShippingInfoModel extends Model {

  getFirstName() {
    return this.get('firstName');
  }

  getLastName() {
    return this.get('lastName');
  }

  getPhone() {
    return this.get('phone');
  }

  getAddressLine1() {
    return this.get('addressLine1');
  }

  getAddressLine2() {
    return this.get('addressLine2');
  }

  getCity() {
    return this.get('city');
  }

  getState() {
    return this.get('state');
  }

  getZip() {
    return this.get('zip');
  }

  getUserId() {
    return this.get('userId');
  }

  getId() {
    return this.get('id');
  }

}

import Model from './Model';

export default class OrderInfoModel extends Model {

  getUserId() {
    return this.get('userId');
  }

  getId() {
    return this.get('id');
  }
}

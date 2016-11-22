import { Map } from 'immutable';

export default class Model {
  constructor(data) {
    this.data = new Map(data);
  }

  get(key) {
    return this.data.get(key);
  }

  set(key, value) {
    return this.data.set(key, value);
  }

  toJS() {
    return this.data.toJS();
  }
}

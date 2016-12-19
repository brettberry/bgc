import { Map } from 'immutable';

export default class Model {
  constructor(data) {
    if (data instanceof Model) {
        this.data = data.getData();
    }
    else if (Map.isMap(data)) {
        this.data = data;
    }
    else {
      this.data = new Map(data);
    }
  }

  getData() {
      return this.data;
  }

  get(key) {
    return this.data.get(key);
  }

  set(key, value) {
    return new this.constructor(this.data.set(key, value));
  }

  toJS() {
    return this.data.toJS();
  }
}

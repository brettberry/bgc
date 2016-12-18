import { List } from 'immutable';
import map from 'lodash/map';
import find from 'lodash/find';
import filter from 'lodash/filter';

export default class Collection {

  constructor(data) {
    if (data instanceof Collection) {
        this.data = data.getData();
    }
    else if (List.isList(data)) {
        this.data = data;
    }
    else {
      const Model = this.constructor.ModelType;
        this.data = new List(map(data, (d) => {
            const model = d instanceof Model ? d : new Model(d);
            return model;
        }));
    }
  }

  getData() {
      return this.data;
  }

  toArray() {
    return this.data.toArray();
  }

  map(predicate) {
    return new this.constructor(map(this.toArray(), predicate));
  }

  find(predicate) {
    return find(this.toArray(), predicate);
  }

  filter(predicate) {
    return new this.constructor(filter(this.toArray(), predicate));
  }

  toJS() {
    return this.data.toJS();
  }

  push(item) {
    return new this.constructor(this.data.push(item));
  }
}

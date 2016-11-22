import { List } from 'immutable';
import map from 'lodash/map';
import find from 'lodash/find';

export default class Collection {

  constructor(data) {
    this.data = new List(map(data, (element) => {
      if (element instanceof this.constructor.ModelType) {
        return element;
      }
      return new this.constructor.ModelType(element);
    }));
  }

  toArray() {
    return this.data.toArray();
  }

  find(predicate) {
    return find(this.toArray(), predicate);
  }
}


import { Map } from 'immutable';

export default class Model {
    constructor(data) {
        this.data = new Map(data);
    }

    toJS() {
        return this.data.toJS();
    }
}

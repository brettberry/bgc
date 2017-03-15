import Model from './Model';

export default class TagModel extends Model {

    getTag() {
        return this.get('tag');
    }

    getPath() {
        return this.get('path');
    }

}

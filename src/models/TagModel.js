import Model from './Model';

export default class TagModel extends Model {

    getTag() {
        return this.get('tag');
    }

    getTagPath() {
        return this.get('path');
    }

}

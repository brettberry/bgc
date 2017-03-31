import Collection from './Collection';
import TagModel from './TagModel';

export default class TagCollection extends Collection {

  static ModelType = TagModel

  findByTagPath(tagPathName) {
    return this.find(item => item.getTagPath() === tagPathName);
  }
}

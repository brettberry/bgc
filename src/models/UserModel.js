import Model from './Model';

export default class UserModel extends Model {

    getEmail() {
        return this.get('email');
    }

    getId() {
        return this.get('id');
    }

}

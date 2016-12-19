import { Component, PropTypes } from 'react';
import User from '../auth/src/models/User';
import Promise from 'bluebird';

class AuthProvider extends Component {

  static childContextTypes = {
    user: PropTypes.instanceOf(User),
    login: PropTypes.func,
    createUser: PropTypes.func
  }

  state = {
    user: null
  }

  getChildContext() {
    return {
      user: this.state.user,
      login: this.login.bind(this),
      createUser: this.createUser.bind(this)
    };
  }

  componentDidMount() {

  }

  render() {
    return this.props.children;
  }

  login(username, password) {
    Promise.resolve()
      .then(() => fetch('//localhost:5002/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }))
      .then(res => res.json())
      .then(body => {
        const user = new User(body);
        this.setState({ user: user });
      });
  }

  createUser(username, password) {
    //FIXME
    Promise.resolve()
      .then(() => fetch('//localhost:5002/auth/users', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }))
      .then(res => res.json())
      .then(body => {
        const user = new User(body);
        this.setState({ user: user });
      });
  }
}

export default AuthProvider;

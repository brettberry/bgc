import { Component, PropTypes } from 'react';
import User from '../auth/src/models/User';
import Promise from 'bluebird';

class AuthProvider extends Component {

  static childContextTypes = {
    user: PropTypes.instanceOf(User),
    login: PropTypes.func,
    createUser: PropTypes.func,
    getCurrentUser: PropTypes.func,
    logout: PropTypes.func
  }

  state = {
    user: null
  }

  getChildContext() {
    return {
      user: this.state.user,
      login: this.login.bind(this),
      createUser: this.createUser.bind(this),
      getCurrentUser: this.getCurrentUser.bind(this),
      logout: this.logout.bind(this)
    };
  }

  render() {
    return this.props.children;
  }

  logout() {
    return Promise.resolve()
      .then(() => fetch('//localhost:5002/auth/logout', {
        method: 'POST',
        credentials: 'include'
      }))
      .then(() => {
        this.setState({ user: null });
      });
  }

  login(username, password) {
    return Promise.resolve()
      .then(() => fetch('//localhost:5002/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }))
      .then(res => res.json())
      .then(body => {
        const user = new User(body);
        this.setState({ user: user });
      });
  }

  createUser(username, password) {
    //FIXME
    return Promise.resolve()
      .then(() => fetch('//localhost:5002/auth/users', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }))
      .then(() => this.login(username, password));
  }

  getCurrentUser() {
    return Promise.resolve()
      .then(() => fetch('//localhost:5002/auth/users/me', {
        credentials: 'include'
      }))
      .then(res => res.json())
      .then(body => {
        const user = new User(body);
        this.setState({ user: user });
        return user;
      });
  }
}

export default AuthProvider;

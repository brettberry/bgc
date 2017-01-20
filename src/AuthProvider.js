import React, { Component, PropTypes } from 'react';
import User from '../auth/src/models/User';
import Promise from 'bluebird';

class AuthProvider extends Component {

  static contextTypes = {
    router: PropTypes.object,
    location: PropTypes.object
  }

  static propTypes = {
    redirectIfNoUser: PropTypes.bool
  }

  static defaultProps = {
    redirectIfNoUser: false
  }

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

  componentWillMount() {
    this.getUserPromise = null;
    if (!this.props.redirectIfNoUser) {
      return;
    }
    this.getUserPromise = this.getCurrentUser()
      .catch(() => {
        this.context.router.push({
          pathname: '/account/login',
          query: { redirectTo: this.context.router.createHref(this.context.location) }
        });
      });
  }

  /* check if we are waiting for a user. If not waiting for user, show children.
  If waiting, show loading spinner. If not waiting, show children. */

  render() {
    if (!this.getUserPromise) {
      return this.props.children;
    }
    //FIXME: add loading spinner
    if (this.getUserPromise.isPending()) {
      return (
        <div/>
      );
    }
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
      .then(res => {
        if (res.status !== 200) {
          throw new Error('User not logged in');
        }
        return res.json();
      })
      .then(body => {
        const user = new User(body);
        this.setState({ user: user });
        return user;
      });
  }
}

export default AuthProvider;

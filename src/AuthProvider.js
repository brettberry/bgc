import React, { Component, PropTypes } from 'react';
import Promise from 'bluebird';
import User from '../auth/src/models/User';

class AuthProvider extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    redirectIfNoUser: PropTypes.bool,
    location: PropTypes.object
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
    user: null,
    isLoading: false
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
    this.setState({ isLoading: true });
    this.getUserPromise = this.getCurrentUser()
      .then(() => this.setState({ isLoading: false }))
      .catch(() => {
        this.context.router.push({
          pathname: '/account/login',
          query: { redirectTo: this.context.router.createHref(this.props.location) }
        });
        this.setState({ isLoading: false });
      });
  }

  /* check if we are waiting for a user. If not waiting for user, show children.
  If waiting, show loading spinner. If not waiting, show children. */

  render() {
    //FIXME: add loading spinner
    if (this.state.isLoading) {
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
        window.location.reload(true);
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

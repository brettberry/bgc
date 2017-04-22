import React, { Component, PropTypes } from 'react';
import Promise from 'bluebird';
import UserModel from '../models/UserModel';
import { fetchCurrentUser, login, logout, createUser } from '../actions/auth';

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
    user: PropTypes.instanceOf(UserModel),
    login: PropTypes.func,
    createUser: PropTypes.func,
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
      logout: this.logout.bind(this)
    };
  }

  componentWillMount() {
    this.getUserPromise = null;
    if (!this.props.redirectIfNoUser) {
      return;
    }
    this.setState({ isLoading: true });
    this.getUserPromise = fetchCurrentUser()
      .then(user => this.setState({
        user: new UserModel(user),
        isLoading: false
      }))
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
      .then(() => logout())
      .then(() => {
        this.setState({ user: null });
        window.location.reload(true);
      });
  }

  login(email, password) {
    return Promise.resolve()
      .then(() => login(email, password))
      .then(() => fetchCurrentUser())
      .then(body => {
        const user = new UserModel(body);
        this.setState({ user: user });
      });
  }

  createUser(email, password) {
    return Promise.resolve()
      .then(() => createUser(email, password))
      .then(() => this.login(email, password));
  }
}

export default AuthProvider;

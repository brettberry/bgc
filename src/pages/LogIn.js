import React, { Component, PropTypes } from 'react';
import './login.styles.scss';

class LogIn extends Component {

  static propTypes = {
    location: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
  }

  handleSubmit() {
    const pathname = this.props.location.query.redirectTo || '/';
    this.context.router.push(pathname);
  }

  render() {
    return (
      <div className="loginContainer">
        <ReturnAccount onSubmit={this.handleSubmit.bind(this)} />
        <NewAccount onSubmit={this.handleSubmit.bind(this)} />
      </div>
    );
  }
}

class ReturnAccount extends Component {

  static propTypes = {
    onSubmit: PropTypes.func
  }

  static contextTypes = {
    login: PropTypes.func
  }

  state = {
    username: '',
    password: ''
  }

  handleLogin() {
    const { username, password } = this.state;
    this.context.login(username, password).then(this.props.onSubmit);
  }

  render() {
    return (
      <div className="newUserContainer">
        <h3>Log In</h3>
        <input placeholder="username" onChange={(e) => this.setState({ username: e.target.value })} />
        <input placeholder="password" onChange={(e) => this.setState({ password: e.target.value })} />
        <button onClick={this.handleLogin.bind(this)}>Submit</button>
      </div>
    );
  }
}

class NewAccount extends Component {

  static propTypes = {
    onSubmit: PropTypes.func
  }

  static contextTypes = {
    createUser: PropTypes.func
  }

  state = {
    username: '',
    password: '',
    confirmPassword: '',
    passwordError: false
  }

  handleSubmit() {
    const { username, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      return this.setState({ passwordError: true });
    }
    this.context.createUser(username, password).then(this.props.onSubmit);
  }

  render() {
    return (
      <div className="returningUserContainer">
        <h3>Create Account</h3>
        <input placeholder="username" onChange={(e) => this.setState({ username: e.target.value })} />
        <input placeholder="new password" onChange={(e) => this.setState({ password: e.target.value })} />
        <input placeholder="confirm password" onChange={(e) => this.setState({ confirmPassword: e.target.value })} />
        <button onClick={this.handleSubmit.bind(this)}>Submit</button>
      </div>
    );
  }
}

export default LogIn;

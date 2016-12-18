import React, { Component } from 'react';
import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';
import './login.styles.scss';

class LogIn extends Component {
  render() {
    return (
      <div className="loginContainer">
        <ReturnAccount />
        <NewAccount />
      </div>
    );
  }
}

class ReturnAccount extends Component {

  state = {
    username: '',
    password: ''
  }

  handleLogin() {
    const { username, password } = this.state;

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
      .then(body => console.log(body));
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
      .then(res => res.json());
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

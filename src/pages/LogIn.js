import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { orange800 } from 'material-ui/styles/colors';
import Button from '../Buttons';
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

    const styles = {
      underlineStyle: {
        borderColor: orange800
      },
      floatingLabelStyle: {
        color: orange800
      },
      floatingLabelFocusStyle: {
        color: orange800
      }
    };

    return (
      <div className="returningUserContainer">
        <div>
          <h3 className="header">Log In</h3>
          <TextField floatingLabelText="username"
                     fullWidth={true}
                     underlineFocusStyle={styles.underlineStyle}
                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                     onChange={(e) => this.setState({ username: e.target.value })} />
          <TextField floatingLabelText="password"
                     fullWidth={true}
                     underlineFocusStyle={styles.underlineStyle}
                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                     onChange={(e) => this.setState({ password: e.target.value })} />
        </div>
        <button onClick={this.handleLogin.bind(this)} className="button">Sign In</button>
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

    const styles = {
      underlineStyle: {
        borderColor: orange800
      },
      floatingLabelStyle: {
        color: orange800
      },
      floatingLabelFocusStyle: {
        color: orange800
      }
    };

    return (
      <div className="newUserContainer">
        <div>
          <h3 className="header">Create Account</h3>
          <TextField floatingLabelText="username"
                     fullWidth={true}
                     underlineFocusStyle={styles.underlineStyle}
                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                     onChange={(e) => this.setState({ username: e.target.value })} />
          <TextField floatingLabelText="create a password"
                     fullWidth={true}
                     underlineFocusStyle={styles.underlineStyle}
                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                     onChange={(e) => this.setState({ password: e.target.value })} />
         <TextField floatingLabelText="confirm password"
                    fullWidth={true}
                    underlineFocusStyle={styles.underlineStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    onChange={(e) => this.setState({ confirmPassword: e.target.value })} />
        </div>
        <button onClick={this.handleSubmit.bind(this)} className="button">Create Account</button>
      </div>
    );
  }
}

export default LogIn;

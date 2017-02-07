import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
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
        <Link className="link" to="/">
          <h3 className="back">Back to browse</h3>
        </Link>
        <div className="titleContainer">
          <h3 className="welcome">Welcome to</h3>
          <h1 className="header">Berry Game Calls</h1>
        </div>
        <div className="registerContainer">
          <ReturnAccount onSubmit={this.handleSubmit.bind(this)} />
          <NewAccount onSubmit={this.handleSubmit.bind(this)} />
        </div>
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
        borderColor: '#ebb052'
      },
      floatingLabelStyle: {
        color: '#ebb052'
      },
      floatingLabelFocusStyle: {
        color: '#ebb052'
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
                     type="password"
                     underlineFocusStyle={styles.underlineStyle}
                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                     onChange={(e) => this.setState({ password: e.target.value })} />
          <p className="passwordReset">Forgot password?</p>
        </div>
        <Button text="Sign In"
                className="loginButton"
                onClick={this.handleLogin.bind(this)} />
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
        borderColor: '#ebb052'
      },
      floatingLabelStyle: {
        color: '#ebb052'
      },
      floatingLabelFocusStyle: {
        color: '#ebb052'
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
                     type="password"
                     underlineFocusStyle={styles.underlineStyle}
                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                     onChange={(e) => this.setState({ password: e.target.value })} />
         <TextField floatingLabelText="confirm password"
                    fullWidth={true}
                    type="password"
                    underlineFocusStyle={styles.underlineStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    onChange={(e) => this.setState({ confirmPassword: e.target.value })} />
        </div>
        <Button text="Create Account"
                className="newAccountButton"
                onClick={this.handleSubmit.bind(this)} />
      </div>
    );
  }
}

export default LogIn;

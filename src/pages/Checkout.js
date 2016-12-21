import React, { Component, PropTypes } from 'react';

class Checkout extends Component {

  static contextTypes = {
    getCurrentUser: PropTypes.func,
    logout: PropTypes.func,
    router: PropTypes.object
  }

  componentDidMount() {
    this.context.getCurrentUser()
      .then(user => {

      })
      .catch(() => {
        this.context.router.push({
          pathname: '/login',
          query: { redirectTo: '/checkout' }
        });
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.context.logout}>Log out</button>
      </div>
    );
  }
}

export default Checkout;

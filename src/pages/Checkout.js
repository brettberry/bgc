import React, { Component, PropTypes } from 'react';

class Checkout extends Component {

  static contextTypes = {
    getCurrentUser: PropTypes.func
  }

  // componentDidMount() {
  //   this.context.getCurrentUser()
  //     .then(user => {
  //
  //     })
  //     .catch(() => {
  //
  //     });
  // }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default Checkout;

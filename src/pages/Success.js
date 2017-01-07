import React, { Component } from 'react';
import { Link } from 'react-router';

class Success extends Component {
  render() {
    return (
      <div>
        <h1>Thank you for your order.</h1>
        <h2>Check your email for receipt.</h2>
        <Link to="/">
          <div>Home</div>
        </Link>
      </div>
    );
  }
}

export default Success;

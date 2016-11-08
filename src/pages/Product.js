import React, { Component } from 'react';

export default class Product extends Component {
  render() {
    const { routeParams } = this.props;
    return (
      <div>
        {routeParams.productName}
      </div>
    );
  }
}

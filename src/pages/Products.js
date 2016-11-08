import React, { Component } from 'react';

export default class Product extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <h1>products</h1>
        {children}
      </div>
    );
  }
}

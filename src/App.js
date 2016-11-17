import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import './app.styles.scss';

export default class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <NavigationBar />
        {children}
      </div>
    );
  }
}

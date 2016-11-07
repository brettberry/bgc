import React, { Component } from 'react';
import NavigationBar from './NavigationBar';

class Home extends Component {
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

export default Home;

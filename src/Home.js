import React, { Component } from 'react';
import Header from './Header';
import Subheader from './Subheader';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '80px',
    flexDirection: 'column'
  },
  contentDiv: {
    display: 'flex',
    height: '350px',
    width: '950px',
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center'
  }
};

class Home extends Component {

  render() {
    return (
      <div style={styles.container}>
        <Header />
        <Subheader />
      </div>
    );
  }
}

export default Home;

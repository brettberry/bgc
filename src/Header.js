import React, { Component } from 'react';
import FlowChart from './FlowChart';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '950px',
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    paddingTop: '0',
    paddingBottom: '45px',
    paddingLeft: '145px',
    paddingRight: '145px'
  },
  icon: {
    minWidth: '60px',
    minHeight: '60px',
    borderRadius: '5px',
    marginBottom: '25px'
  },
  header: {
    flex: 'display',
    color: 'white',
    fontFamily: 'Open Sans, Helvetica, sans-serif',
    fontWeight: 'lighter',
    marginTop: '0',
    textShadow: '0 1px 2px rgba(0,0,0,.5)'
  },
  subtitle: {
    color: '#bd96c1',
    fontFamily: 'Open Sans, Helvetica, sans-serif',
    fontSize: '13pt',
    fontWeight: 'lighter',
    textAlign: 'center',
    textShadow: '0 1px 2px rgba(0,0,0,.5)',
    lineHeight: '1.5em',
    marginBottom: '45px'
  }
};

class Header extends Component {
  render() {
    return (
        <div style={styles.container}>
          <img src="https://stripe.com/img/subscriptions/workflow/workflow.png" style={styles.icon}/>
          <h2 style={styles.header}>Fits within your workflow</h2>
          <span style={styles.subtitle}>Customize the experience for your users from start to finish—our flexible APIs map to every step in a subscription.</span>
          <FlowChart />
        </div>
    );
  }
}

export default Header;

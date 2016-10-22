import React, { Component } from 'react';
import Bubble from './Bubble';
import times from 'lodash/times';
import { bubbleText } from './data.json';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '128px',
    minWidth: '720px',
    marginLeft: '115px',
    marginRight: '115px',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: '1',
    position: 'relative'
  },
  dotContainer: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '25px',
    marginRight: '25px',
    zIndex: -1
  },
  dot: {
    height: '5px',
    width: '5px',
    borderRadius: '50%',
    backgroundColor: 'rgb(162, 101, 162)',
    boxShadow: '0 1px 2px rgba(0,0,0,.5)'
  }
};

class FlowChart extends Component {

  render() {
    const bubbles = times(5, (i) => <Bubble key={i} text={bubbleText[i]} />);
    const dots = times(60, (i) => <div key={i} style={styles.dot} />);
    return (
      <div style={styles.container}>
        {bubbles}
        <div style={styles.dotContainer}> {dots} </div>
      </div>
    );
  }
}

export default FlowChart;

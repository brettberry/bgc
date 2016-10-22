import React, { Component, PropTypes } from 'react';

const styles = {
  container: {
    transition: 'all 0.25s ease-out'
  },
  orangeCircle: {
    display: 'flex',
    backgroundImage: 'linear-gradient(to bottom right, #da8e40 20%, #e2a550 80%)',
    borderRadius: '50%',
    marginRight: '20px',
    marginLeft: '20px',
    justifyContent: 'center',
    backgroundColor: '#da8e40',
    height: '110px',
    width: '110px',
    transform: 'scale(1.15)'
  },
  lightPurpleCircle: {
    display: 'flex',
    backgroundImage: 'linear-gradient(to bottom right,rgba(162,101,162,.5) 20%,rgba(162,101,162,.9) 80%)',
    borderRadius: '50%',
    height: '110px',
    width: '110px',
    justifyContent: 'center',
    marginRight: '20px',
    marginLeft: '20px',
    backgroundColor: '#4b3d68'
  },
  darkPurpleCircle: {
    borderRadius: '50%',
    height: '110px',
    width: '110px',
    backgroundImage: '#624a73',
    display: 'flex',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Open Sans, Helvetica, sans-serif',
    fontSize: '1em',
    fontWeight: 'lighter',
    lineHeight: '24px',
    display: 'flex',
    alignItems: 'center'
  }
};

class Bubble extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired
  }

  state = {
    isHovering: false
  }

  handleHover() {
    const { isHovering } = this.state;
    this.setState({
      isHovering: !isHovering
    });
  }

  render() {
    const { text } = this.props;
    const { isHovering } = this.state;
    return (
      <div style={this.getContainerStyles()}
           onMouseOver={this.handleHover.bind(this)}
           onMouseOut={this.handleHover.bind(this)}>
        <span style={styles.text} dangerouslySetInnerHTML={{ __html: text }}/>
      </div>
    );
  }

  getContainerStyles() {
    const { isHovering } = this.state;
    return {
      ...styles.container,
      ...(isHovering ? styles.orangeCircle : styles.lightPurpleCircle)
    };
  }
}

export default Bubble;

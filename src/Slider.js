import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import map from 'lodash/map';
// import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
// import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import './slider.styles.scss';
import data from './data.json';


class Slider extends Component {

  state = {
    offset: 0,
    reverse: false
  }

  componentDidMount() {
    // if (this.state.reverse) {
    //   this.interval = setInterval(this.pageLeft.bind(this), 3500);
    // }
    this.interval = setInterval(this.pageRight.bind(this), 3500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  pageLeft() {
    const { offset } = this.state;
    this.setState({
      offset: (offset + 1) % 3,
      reverse: true
    });
  }

  pageRight() {
    const { offset } = this.state;
    this.setState({
      offset: (offset - 1) % 3,
      reverse: false
    });
  }

  render() {
    const transitionClasses = classnames('sliderTransition', this.state.reverse ? 'left' : 'right');
    return (
      <div className="sliderContainer">
        <div className="chevronContainer left" onClick={this.pageLeft.bind(this)}>
          {/* <FaChevronLeft className= "chevron"/> */}
        </div>
        <ReactCSSTransitionGroup className={transitionClasses}
                                 transitionName="sliderTransition"
                                 transitionEnterTimeout={500}
                                 transitionLeaveTimeout={500}>
            {this.renderObjects()}
        </ReactCSSTransitionGroup>
        <div className="chevronContainer right" onClick={this.pageRight.bind(this)}>
          {/* <FaChevronRight className="chevron" /> */}
        </div>
      </div>
    );
  }

  renderObjects() {
    const offset = Math.abs(this.state.offset);
    const objects = map(data.sliderImages, (slideImage, key) => {
        return <Slide image={slideImage} key={key} />;
    });
    return objects[offset];
  }
}

class Slide extends Component {

  static props = {
    image: PropTypes.string,
    key: PropTypes.number
  }

  render() {
    return (
      <div className="slider" style={{ backgroundImage: this.props.image }}>
        <div className="dotContainer">
          <div className="dot active" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
    );
  }
}

export default Slider;

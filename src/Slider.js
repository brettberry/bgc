import React, { Component } from 'react';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './slider.styles.scss';

class Slider extends Component {

  state = {
    offset: 0,
    reverse: false
  }

  pageLeft() {
    const { offset } = this.state;
    this.setState({
      offset: (offset - 1) % 3,
      reverse: true
    });
  }

  pageRight() {
    const { offset } = this.state;
    this.setState({
      offset: (offset + 1) % 3,
      reverse: false
    });
  }

  render() {
    return (
      <div className="sliderContainer">
        <div className="chevronContainer left" onClick={this.pageLeft.bind(this)}>
          <FaChevronLeft className= "chevron"/>
        </div>
        <ReactCSSTransitionGroup transitionName="sliderTransition"
                                 transitionEnterTimeout={500}
                                 transitionLeaveTimeout={500}>
            {this.renderObjects()}
        </ReactCSSTransitionGroup>
        <div className="chevronContainer right" onClick={this.pageRight.bind(this)}>
          <FaChevronRight className="chevron" />
        </div>

      </div>
    );
  }

  renderObjects() {
    const offset = Math.abs(this.state.offset);
    const objects = [
      <Object1 key="object1" />,
      <Object2 key="object2" />,
      <Object3 key="object3" />
    ];
    return objects[offset];
  }
}

function Object1() {
  return (
    <div className="slider first">
      <div className="dotContainer">
        <div className="dot active"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}

function Object2() {
  return (
    <div className="slider second">
      <div className="dotContainer">
        <div className="dot"></div>
        <div className="dot active"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}

function Object3() {
  return (
    <div className="slider third">
      <div className="dotContainer">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot active"></div>
      </div>
    </div>
  );
}

export default Slider;

import React, { Component } from 'react';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import './slider.styles.scss';

class Slider extends Component {
  render() {
    return (
      <div className="sliderContainer">
        <div className="slider">
          <div className="chevronContainer">
            <FaChevronLeft className= "chevron"/>
          </div>
          <div className="dotContainer">
            <div className="dot1"/>
            <div className="dot"/>
            <div className="dot"/>
          </div>
          <div className="chevronContainer">
            <FaChevronRight className="chevron" />
          </div>
        </div>
      </div>
    );
  }
}

export default Slider;

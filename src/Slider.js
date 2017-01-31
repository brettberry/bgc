import React, { Component } from 'react';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import './slider.styles.scss';

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
    <div className="slider" style={{ backgroundImage: 'url(/bannerAds/gold-banner-ad.jpg)' }}>
      <div className="dotContainer">
        <div className="dot active" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </div>
  );
}

function Object2() {
  return (
    <div className="slider" style={{ backgroundImage: 'url(/bannerAds/seminar-flyer.jpg)' }}>
      <div className="dotContainer">
        <div className="dot" />
        <div className="dot active" />
        <div className="dot" />
      </div>
    </div>
  );
}

function Object3() {
  return (
    <div className="slider" style={{ backgroundImage: 'url(/bannerAds/seminar-flyer-2.jpg)' }}>
      <div className="dotContainer">
        <div className="dot" />
        <div className="dot" />
        <div className="dot active" />
      </div>
    </div>
  );
}

export default Slider;

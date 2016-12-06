import React, { Component, Children, cloneElement } from 'react';
import omit from 'lodash/omit';

class MobileProvider extends Component {

  state = {
    isMobile: false
  }

  constructor(props) {
    super(props);
    this._handleMediaUpdate = this.handleMediaUpdate.bind(this);
  }

  componentDidMount() {
    this.mql = window.matchMedia('(max-width: 480px)');
    this.mql.addListener(this._handleMediaUpdate);
    this.handleMediaUpdate(this.mql);
  }

  componentWillUnmount() {
    this.mql.removeListener(this._handleMediaUpdate);
  }

  handleMediaUpdate(mql) {
    if (mql.matches) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  }

  render() {
    return cloneElement(Children.only(this.props.children), {
      isMobile: this.state.isMobile,
      ...omit(this.props, ['children'])
    });
  }
}

export default MobileProvider;

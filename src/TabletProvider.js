import React, { Component, Children, cloneElement } from 'react';

class TabletProvider extends Component {

  state = {
    isTablet: false
  }

  constructor(props) {
    super(props);
    this._handleMediaUpdate = this.handleMediaUpdate.bind(this);
  }

  componentDidMount() {
    this.mql = window.matchMedia('(max-width: 825px)');
    this.mql.addListener(this._handleMediaUpdate);
    this.handleMediaUpdate(this.mql);
  }

  componentWillUnmount() {
    this.mql.removeListener(this._handleMediaUpdate);
  }

  handleMediaUpdate(mql) {
    if (mql.matches) {
      this.setState({ isTablet: true });
    } else {
      this.setState({ isTablet: false });
    }
  }

  render() {
    return cloneElement(Children.only(this.props.children), { isTablet: this.state.isTablet });
  }
}

export default TabletProvider;

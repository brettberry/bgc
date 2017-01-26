import React, { Component, PropTypes } from 'react';
import Sidebar from './Sidebar';


class SidebarRenderer extends Component {

  static propTypes = {
    isTablet: PropTypes.bool
  }

  static defaultProps = {
    isTablet: false
  }

  render() {
    return this.props.isTablet ? this.renderTablet() : this.renderDesktop();
  }

  renderTablet() {
    return (
      <div />
    );
  }

  renderDesktop() {
    return (
      <div>
        <Sidebar />
      </div>
    );
  }
}

export default SidebarRenderer;

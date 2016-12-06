import React, { Component, PropTypes } from 'react';
import NavigationBar from './NavigationBar';
import TabletNavigationBar from './TabletNavigationBar';
import TabletProvider from './TabletProvider';
import './app.styles.scss';

export default class App extends Component {
  render() {
    return (
      <TabletProvider>
        <NavBarRenderer />
      </TabletProvider>
    );
  }
}

class NavBarRenderer extends Component {

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
    const { children } = this.props;
    return (
      <div>
        <TabletNavigationBar className="navBarHeader" />
        {children}
      </div>
    );
  }

  renderDesktop() {
    const { children } = this.props;
    return (
      <div>
        <NavigationBar className="navBarHeader" />
        {children}
      </div>
    );
  }
}

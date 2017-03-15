import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MobileNavigationBar from '~/components/MobileNavigationBar';
import NavigationBar from '~/components/NavigationBar';
import { CartProvider,
         AuthProvider,
         ShippingProvider,
         TabletProvider,
         MobileProvider } from '~/providers';
import './app.styles.scss';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <CartProvider>
          <AuthProvider>
            <ShippingProvider>
              <TabletProvider>
                <MobileProvider>
                  <NavBarRenderer>
                    {this.props.main}
                    {this.props.footer}
                  </NavBarRenderer>
                </MobileProvider>
              </TabletProvider>
            </ShippingProvider>
          </AuthProvider>
        </CartProvider>
      </MuiThemeProvider>
    );
  }
}

class NavBarRenderer extends Component {

  static propTypes = {
    isTablet: PropTypes.bool,
    isMobile: PropTypes.bool
  }

  static defaultProps = {
    isTablet: false,
    isMobile: false
  }

  render() {
    if (this.props.isMobile) {
      return this.renderMobile();
    }
    if (this.props.isTablet) {
      return this.renderTablet();
    }
    return this.renderDesktop();
  }

  renderTablet() {
    const { children } = this.props;
    return (
      <div>
        <MobileNavigationBar className="navBarHeader"/>
        {children}
      </div>
    );
  }

  renderDesktop() {
    const { children } = this.props;
    return (
      <div>
        <NavigationBar className="navBarHeader"/>
        {children}
      </div>
    );
  }

  renderMobile() {
    const { children } = this.props;
    return (
      <div>
        <MobileNavigationBar className="navBarHeader"/>
        {children}
      </div>
    );
  }
}

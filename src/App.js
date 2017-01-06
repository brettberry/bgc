import React, { Component, PropTypes } from 'react';
import NavigationBar from './NavigationBar';
import ShippingProvider from './ShippingProvider';
import TabletNavigationBar from './TabletNavigationBar';
import MobileNavigationBar from './MobileNavigationBar';
import TabletProvider from './TabletProvider';
import MobileProvider from './MobileProvider';
import CartProvider from './CartProvider';
import AuthProvider from './AuthProvider';
import './app.styles.scss';

export default class App extends Component {
  render() {
    const { children } = this.props;
    return (
        <CartProvider>
          <AuthProvider>
            <TabletProvider>
              <MobileProvider>
                <ShippingProvider>
                  <NavBarRenderer>
                    {children}
                  </NavBarRenderer>
                </ShippingProvider>
              </MobileProvider>
            </TabletProvider>
          </AuthProvider>
        </CartProvider>
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
        {/* <TabletNavigationBar /> */}
        <MobileNavigationBar className="navBarHeader" />
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

  renderMobile() {
    const { children } = this.props;
    return (
      <div>
        <MobileNavigationBar className="navBarHeader" />
        {children}
      </div>
    );
  }
}

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ShippingProvider from './ShippingProvider';
import CartProvider from './CartProvider';
import AuthProvider from './AuthProvider';

export default class AccountApp extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <CartProvider>
          <AuthProvider redirectIfNoUser location={this.props.location}>
            <ShippingProvider>
              {this.props.main}
            </ShippingProvider>
          </AuthProvider>
        </CartProvider>
      </MuiThemeProvider>
    );
  }
}

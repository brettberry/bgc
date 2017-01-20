import React, { Component } from 'react';
import ShippingProvider from './ShippingProvider';
import CartProvider from './CartProvider';
import AuthProvider from './AuthProvider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class AccountApp extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <CartProvider>
          <AuthProvider redirectIfNoUser>
            <ShippingProvider>
              {this.props.main}
            </ShippingProvider>
          </AuthProvider>
        </CartProvider>
      </MuiThemeProvider>
    );
  }
}

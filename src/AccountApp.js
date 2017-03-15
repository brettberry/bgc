import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ShippingProvider, CartProvider, AuthProvider } from '~/providers';

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

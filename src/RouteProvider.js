import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import $ from 'jquery';
import Home from './Home';
import App from './App';
import AccountApp from './AccountApp';
import Footer from './Footer';
import { Products, Product, Demos, About, Gallery, Events, Tags, MobileDemos,
         LogIn, Cart, Checkout, Success } from './pages';

export default function RouteProvider() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App} onChange={changeRoute}>
        <IndexRoute components={{ main: Home, footer: Footer }} />
        <Route path="products" components={{ main: Products }} />
        <Route path="products/tags/:tagName" components={{ main: Tags }} />
        <Route path="products/:group/:productName" components={{ main: Product, footer: Footer }} />
        <Route path="products/:group" />
        <Route path="demos" components={{ main: MobileDemos, footer: Footer }} />
        <Route path="about" components={{ main: About, footer: Footer }} />
        <Route path="gallery" components={{ main: Gallery }} />
        <Route path="events" components={{ main: Events, footer: Footer }} />
        <Route path="cart" components={{ main: Cart }} />
      </Route>
      <Route path="/account" component={AccountApp} onChange={changeRoute}>
        <Route path="login" components={{ main: LogIn, footer: Footer }} />
        {/* <Route path="cart" components={{ main: Cart, footer: Footer }} /> */}
        <Route path="checkout" components={{ main: Checkout, footer: Footer }}/>
        <Route path="checkout/success" components={{ main: Success, footer: Footer }} />
      </Route>
    </Router>
  );
}

function changeRoute() {
  $(window).scrollTop(0);
}

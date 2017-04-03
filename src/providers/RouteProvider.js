import React from 'react';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import $ from 'jquery';
import App from '~/App';
import AccountApp from '~/AccountApp';
import Footer from '~/components/Footer';
import { Home, Products, Product, Demos, About, Gallery, CustomerGallery,
         Events, Tags, LogIn, Cart, Checkout, Success } from '~/pages';

export default function RouteProvider() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App} onChange={changeRoute}>
        <IndexRoute components={{ main: Home, footer: Footer }}/>
        <Route path="products" components={{ main: Products }}/>
        <Route path="products/tags/:tagName" components={{ main: Tags }}/>
        <Route path="products/:group/:productName" components={{ main: Product, footer: Footer }}/>
        <Route path="products/:group"/>
        <Route path="demos" components={{ main: Demos, footer: Footer }}/>
        <Route path="about" components={{ main: About, footer: Footer }}/>
        <Route path="gallery" components={{ main: Gallery }}/>
        <Route path="customer-gallery" components={{ main: CustomerGallery }}/>
        <Route path="events" components={{ main: Events, footer: Footer }}/>
        <Route path="cart" components={{ main: Cart }}/>
      </Route>
      <Route path="/account" component={AccountApp} onChange={changeRoute}>
        <IndexRedirect to="checkout"/>
        <Route path="login" components={{ main: LogIn }}/>
        <Route path="checkout" components={{ main: Checkout }}/>
        <Route path="checkout/success" components={{ main: Success }}/>
      </Route>
    </Router>
  );
}

function changeRoute() {
  $(window).scrollTop(0);
}

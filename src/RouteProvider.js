import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import $ from 'jquery';

import Home from './Home';
import App from './App';
import { Products, Product, Demos, About, Gallery, Events, Tags, MobileDemos,
         LogIn, Cart, Checkout, Success } from './pages';

export default function RouteProvider() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App} onChange={changeRoute}>
        <IndexRoute component={Home} />
        <Route path="products" component={Products} />
        <Route path="products/tags/:tagName" component={Tags} />
        <Route path="products/:group/:productName" component={Product} />
        <Route path="products/:group" />
        <Route path="demos" component={MobileDemos} />
        <Route path="about" component={About} />
        <Route path="gallery" component={Gallery} />
        <Route path="events" component={Events} />
        <Route path="login" component={LogIn} />
        <Route path="cart" component={Cart} />
        <Route path="checkout" component={Checkout} />
        <Route path="checkout/success" component={Success} />
      </Route>
    </Router>
  );
}

function changeRoute() {
  $(window).scrollTop(0);
}

import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import $ from 'jquery';

import Home from './Home';
import App from './App';
import { Products, Product, Demos, About, Gallery, Events } from './pages';

export default function RouteProvider() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App} onChange={changeRoute}>
        <IndexRoute component={Home} />
        <Route path="products" component={Products} />
        <Route path="products/:productName" component={Product} />
        <Route path="demos" component={Demos} />
        <Route path="about" component={About} />
        <Route path="gallery" component={Gallery} />
        <Route path="events" component={Events} />
      </Route>
    </Router>
  );
}

function changeRoute() {
  $(window).scrollTop(0);
}

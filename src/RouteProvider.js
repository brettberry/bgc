import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Home from './Home';
import { Products, Product } from './pages';

export default function RouteProvider() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Home}>
        <Route path="products" component={Products}>
          <Route path=":productName" component={Product} />
        </Route>
      </Route>
    </Router>
  );
}

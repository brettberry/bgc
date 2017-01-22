import React from 'react';
import ReactDOM from 'react-dom';
import RouteProvider from './RouteProvider';
import Promise from 'bluebird';
import 'source-sans-pro/source-sans-pro.css';
import 'animate.css/animate.css';

Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

ReactDOM.render(<RouteProvider/>, document.getElementById('react-main'));

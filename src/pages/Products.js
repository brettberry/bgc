import React, { Component } from 'react';
import './products.styles.scss';
import data from '../data.json';
import { ProductCollection } from '../models';
import map from 'lodash/map';
import classnames from 'classnames';
import Sidebar from '../Sidebar';

const products = new ProductCollection(data.products);

export default class Product extends Component {
  render() {
    const bugles = products.filterByCategory('bugles');
    const reeds = products.filterByCategory('reeds');
    const goldenDome = products.filterByCategory('golden-dome');
    const xSeries = products.filterByCategory('x-series');
    const bigBull = products.filterByCategory('big-bull');
    const cowCalls = products.filterByCategory('cow-calls');
    const dvds = products.filterByCategory('dvds');
    const other = products.filterByCategory('other');
    const sale = products.filterByCategory('sale');
    const popular = products.filterByCategory('popular');
    return (
      <div>
        <Sidebar />
        <ProductGrid />
      </div>
    );
  }
}

function ProductGrid() {
  return (
    <div className="gridContainer">
      <GridRow />
      <GridRow />
      <GridRow />
      <GridRow />
      <GridRow />
    </div>
  );
}

function GridRow() {
  return (
    <div className="gridRow">
      <div className="gridBox"></div>
      <div className="gridBox"></div>
    </div>
  );
}

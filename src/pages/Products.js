import React, { Component, PropTypes } from 'react';
import './products.styles.scss';
import data from '../data.json';
import map from 'lodash/map';
import TabletProvider from '../TabletProvider';
import { ProductCollection } from '../models';
import ProductGrid from '../ProductGrid';
import SidebarRenderer from '../SidebarRenderer';

const products = new ProductCollection(data.products);

export default class Products extends Component {
  render() {
    return (
      <div className="productsContainer">
        <TabletProvider>
          <SidebarRenderer />
        </TabletProvider>
        <div className="productGrid">{map(products.toArray(), (product, key) =>
          <ProductGrid product={product} key={key} />)}
        </div>
      </div>
    );
  }
}

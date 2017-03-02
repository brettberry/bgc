import React, { Component } from 'react';
import data from '../data.json';
import map from 'lodash/map';

import { ProductCollection } from '../models';
import TabletProvider from '../TabletProvider';
import ProductGrid from '../ProductGrid';
import SidebarRenderer from '../SidebarRenderer';
import './products.styles.scss';


const products = new ProductCollection(data.products);

export default class Products extends Component {
  render() {
    return (
      <div className="productsContainer">
        <TabletProvider>
          <SidebarRenderer/>
        </TabletProvider>
        <div className="productGrid">{map(products.toArray(), (product, key) =>
          <ProductGrid product={product} key={key}/>)}
        </div>
      </div>
    );
  }
}

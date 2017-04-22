import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import map from 'lodash/map';

import { ProductCollection } from '../models';
import TabletProvider from '~/providers/TabletProvider';
import ProductGrid from '~/components/ProductGrid';
import SidebarRenderer from '~/renderers/SidebarRenderer';
import './products.styles.scss';

export default class Products extends Component {

  state = {
    products: new ProductCollection()
  }

  componentDidMount() {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(products => {
        this.setState({ products: new ProductCollection(products) });
      });
  }

  render() {
    const { products } = this.state;
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

import React, { Component } from 'react';
import data from '../data.json';
import { ProductCollection } from '../models';
import map from 'lodash/map';
import TabletProvider from '../TabletProvider';
import ProductGrid from '../ProductGrid';
import SidebarRenderer from '../SidebarRenderer';

const products = new ProductCollection(data.products);

class Tags extends Component {
  render() {
    const tagName = this.props.routeParams.tagName;
    const productName = products.filterByTag(tagName);
    return (
      <div className="productsContainer">
        <TabletProvider>
          <SidebarRenderer />
        </TabletProvider>
        <div className="productGrid">{map(productName.toArray(), (product, key) =>
          <ProductGrid product={product} key={key} />)}
        </div>
      </div>
    );
  }
}

export default Tags;

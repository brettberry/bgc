import React, { Component } from 'react';
import map from 'lodash/map';

import { ProductCollection } from '~/models';
import SidebarRenderer from '~/renderers/SidebarRenderer';
import TabletProvider from '~/providers/TabletProvider';
import ProductGrid from '~/components/ProductGrid';
import data from '~/data.json';

const products = new ProductCollection(data.products);

class Tags extends Component {
  render() {
    const tagName = this.props.routeParams.tagName;
    const productName = products.filterByTag(tagName);
    return (
      <div className="productsContainer">
        <TabletProvider>
          <SidebarRenderer/>
        </TabletProvider>
        <div className="productGrid">{map(productName.toArray(), (product, key) =>
          <ProductGrid product={product} key={key}/>)}
        </div>
      </div>
    );
  }
}

export default Tags;

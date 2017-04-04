import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import ProductsMenu from './ProductsMenu';
import './navigationBar.styles.scss';

class ProductsMenuItem extends Component {

  state = {
    showProductsMenu: false
  }

  showMenu() {
    this.setState({ showProductsMenu: true });
    clearTimeout(this.timeout);
  }

  closeMenu() {
    this.timeout = setTimeout(() => {
      this.setState({ showProductsMenu: false });
    }, 300);
  }

  render() {
    return (
      <div className={classnames('menuItem', this.state.showProductsMenu && 'showProductsMenu')}
           onMouseEnter={() => this.showMenu()}
           onMouseLeave={() => this.closeMenu()}>
        <Link to="/products"
              className="menuLink"
              onClick={() => this.setState({ showProductsMenu: false })}>
          <h3 className="item">Products</h3>
          <div className="underline"/>
        </Link>
        <ProductsMenu className="productsMenu"
                      onItemClick={() => this.setState({ showProductsMenu: false })}/>
      </div>
    );
  }
}

export default ProductsMenuItem;

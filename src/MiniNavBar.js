import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import FaSearch from 'react-icons/lib/fa/search';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import map from 'lodash/map';
import ProductCollection from './models/ProductCollection';
import data from './data.json';
import './miniNavBar.styles.scss';

const products = new ProductCollection(data.products);

class MiniNavBar extends Component {

  static propTypes = {
    showResponsiveNavBar: PropTypes.bool.isRequired
  }

  render() {
    return (
      <div className={classnames('responsiveNavBar', this.props.showResponsiveNavBar && 'showNav')}>
        <div className="navBarContents">
          <Link to="/" className="bgcLink">
            <h1 className="bgc">BGC</h1>
          </Link>
          <Search products={products} />
          <ShoppingCenter className="light"/>
        </div>
      </div>
    );
  }
}

class Search extends Component {

  static propTypes = {
    products: PropTypes.instanceOf(ProductCollection).isRequired
  }

  state = {
    searchResults: new ProductCollection()
  }

  handleInputChange(e) {
    const text = e.target.value;
    const searchResults = this.props.products.findBySearch(text);
    this.setState({ searchResults: searchResults });
  }

  render() {
    return (
      <div className="searchContainer">
        <div className="searchDiv">
          <input className="searchBar"
                 onChange={(e) => this.handleInputChange(e)}
                 placeholder="Search products"
                 autoFocus />
          <div className="searchButton">
            <FaSearch className="searchIcon" />
          </div>
        </div>
        {this.renderAllResults()}
      </div>
    );
  }

  renderAllResults() {
    if (this.state.searchResults.toArray().length === 0) {
      return;
    }
    return (
      <div className="resultsContainer">
        {map(this.state.searchResults.toArray(), this.renderSearchResult.bind(this))}
      </div>
    );
  }

  renderSearchResult(item, key) {
    return (
      <div key={key}>
        <div>{item.getFullName()}</div>
        <div className="description">{ellipsify(item.getDescription())}</div>
      </div>
    );
  }
}

function ellipsify(string) {
  return string.slice(0, 200) + '...';
}

export function ShoppingCenter({ className, onSearchClick }) {
  return (
    <div>
      <div className={classnames('shoppingContainer', className)}>
        <FaSearch className="searchIcon" onClick={onSearchClick} />
        <div className="divider hide" />
        <FaShoppingCart className="cartIcon" />
        <div className="divider" />
        <h3 className="accountText">My <br/> Account</h3>
      </div>
    </div>
  );
}

export default MiniNavBar;

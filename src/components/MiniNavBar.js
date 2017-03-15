import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link } from 'react-router';
import clickOutside from 'react-click-outside';
import classnames from 'classnames';
import map from 'lodash/map';
import FaSearch from 'react-icons/lib/fa/search';

import ProductCollection from '~/models/ProductCollection';
import data from '~/data.json';
import './miniNavBar.styles.scss';

const products = new ProductCollection(data.products);

class MiniNavBar extends Component {

  static propTypes = {
    showResponsiveNavBar: PropTypes.bool.isRequired
  }

  focusInput() {
    this.refs.search.focus();
  }

  render() {
    const SearchComponent = clickOutside(Search);
    return (
      <div className={classnames('responsiveNavBar', this.props.showResponsiveNavBar && 'showNav')}>
        <div className="navBarContents">
          <Link to="/" className="bgcLink">
            <h1 className="bgc">BGC</h1>
          </Link>
          <SearchComponent products={products} ref="search"/>
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

  handleClickOutside() {
    this.setState({ searchResults: new ProductCollection() });
  }

  handleInputChange(e) {
    const text = e.target.value;
    const searchResults = this.props.products.findBySearch(text);
    this.setState({ searchResults: searchResults });
  }

  focus() {
    const inputNode = ReactDOM.findDOMNode(this.refs.input);
    $(inputNode).focus();
  }

  render() {
    return (
      <div className="searchContainer">
        <div className="searchDiv">
          <input className="searchBar"
                 onChange={(e) => this.handleInputChange(e)}
                 onFocus={(e) => this.handleInputChange(e)}
                 placeholder="Search products"
                 autoFocus
                 ref="input" />
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
    return <SearchDropDown searchResults={this.state.searchResults}/>;
  }
}

class SearchDropDown extends Component {
  render() {
    return (
      <div className="resultsContainer">
        {map(this.props.searchResults.toArray(), this.renderSearchResult.bind(this))}
      </div>
    );
  }

  renderSearchResult(item, key) {
    return (
      <Link to={`/products/${item.getCategory()}/${item.getPathName()}`}
            className="link"
            key={key}>
        <div className="searchItemContainer">
          <div className="searchItem">{item.getFullName()}</div>
          <div className="description">{ellipsify(item.getDescription())}</div>
        </div>
      </Link>
    );
  }
}

function ellipsify(string) {
  return string.slice(0, 200) + '...';
}

export default MiniNavBar;

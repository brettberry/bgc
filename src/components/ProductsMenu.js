import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import clickOutside from 'react-click-outside';
import map from 'lodash/map';

import { ProductCollection } from '~/models';
import data from '~/data.json';
import './productsMenu.styles.scss';

const products = new ProductCollection(data.products);

class ProductsMenu extends Component {

  static propTypes = {
    className: PropTypes.string,
    onItemClick: PropTypes.func.isRequired,
    onClose: PropTypes.func
  }

  handleClickOutside() {
    if (this.props.closeMenu) {
      this.props.closeMenu();
    }
  }

  render() {
    const { className } = this.props;
    const bugles = products.filterByCategory('bugles');
    const reeds = products.filterByCategory('reeds');
    const cowCalls = products.filterByCategory('cow-calls');
    const dvds = products.filterByCategory('dvds');
    const other = products.filterByCategory('other');

    return (
      <div className={classnames('dropdown', className)}>
        <div className="productMenuContainer">
          <div className="group1">
            <Bugles bugles={bugles} onItemClick={this.props.onItemClick}/>
            <Reeds reeds={reeds} onItemClick={this.props.onItemClick}/>
          </div>
          <div className="group2">
            <DVDs dvds={dvds} onItemClick={this.props.onItemClick}/>
            <Other cowCalls={cowCalls} other={other} onItemClick={this.props.onItemClick}/>
          </div>
        </div>
      </div>
    );
  }
}

function Bugles({ bugles, onItemClick }) {
  return (
    <div className="buglesContainer">
      <Link to="/products/tags/bugles" className="productsLink" onClick={onItemClick}>
        <p className="columnTitle">Bugles</p>
      </Link>
        <div>{map(bugles.toArray(), (bugle, key) =>
          <Link key={key} to={`/products/${bugle.getCategory()}/${bugle.getPathName()}`}
                className="productsLink"
                onClick={onItemClick}>
            <p className="productNames">{bugle.getFullName()}</p>
          </Link>)
        }</div>
    </div>
  );
}

function Reeds({ reeds, onItemClick }) {
  return (
    <div className="reedsContainer">
      <Link to="/products/tags/reeds" className="productsLink" onClick={onItemClick}>
        <p className="columnTitle">Reeds</p>
      </Link>
      <div>{map(reeds.toArray(), (reed, key) =>
        <Link key={key} to={`/products/${reed.getCategory()}/${reed.getPathName()}`}
              className="productsLink"
              onClick={onItemClick}>
          <p className="productNames">{reed.getFullName()}</p>
        </Link>)
      }</div>
    </div>
  );
}

function DVDs({ dvds, onItemClick }) {
  return (
    <div className="dvdsContainer">
      <Link to="/products/tags/dvds" className="productsLink" onClick={onItemClick}>
        <h3 className="columnTitle">Hunting DVDs</h3>
      </Link>
      <div>{map(dvds.toArray(), (dvd, key) =>
        <Link key={key} to={`/products/${dvd.getCategory()}/${dvd.getPathName()}`}
              className="productsLink"
              onClick={onItemClick}>
          <p className="productNames">{dvd.getFullName()}</p>
        </Link>)
      }</div>
    </div>
  );
}

function Other({ cowCalls, other, onItemClick }) {
  return (
    <div className="otherContainer">
      <Link to="/products/tags/cow-calls" className="productsLink" onClick={onItemClick}>
        <h3 className="columnTitle">Cow Calls</h3>
      </Link>
      <div>{map(cowCalls.toArray(), (cowCall, key) =>
        <Link key={key} to={`/products/${cowCall.getCategory()}/${cowCall.getPathName()}`}
              className="productsLink" onClick={onItemClick}>
          <p className="productNames">{cowCall.getFullName()}</p>
        </Link>)
      }</div>
      <Link to="/products/tags/other" className="productsLink" onClick={onItemClick}>
        <h3 className="columnTitle">Other</h3>
      </Link>
      <div>{map(other.toArray(), (otherItem, key) =>
        <Link key={key}
              to={`/products/${otherItem.getCategory()}/${otherItem.getPathName()}`}
              className="productsLink"
              onClick={onItemClick}>
          <p className="productNames">{otherItem.getFullName()}</p>
        </Link>)
      }</div>
    </div>
  );
}

export default clickOutside(ProductsMenu);

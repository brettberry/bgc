import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import './productsMenu.styles.scss';
import data from './data.json';
import { ProductCollection } from './models';
import map from 'lodash/map';

const products = new ProductCollection(data.products);

class ProductsMenu extends Component {

  static propTypes = {
    className: PropTypes.string
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
        <div className="container">
          <Bugles bugles={bugles} />
          <Reeds reeds={reeds} />
          <DVDs dvds={dvds} />
          <Other cowCalls={cowCalls} other={other} />
        </div>
      </div>
    );
  }
}

function Bugles({ bugles }) {
  return (
    <div>
      <Link to="/products/tags/bugles" className="link">
        <p className="columnTitle">Bugles and Accessories</p>
      </Link>
        <div>{map(bugles.toArray(), (bugle, key) =>
          <Link key={key} to={`/products/${bugle.getCategory()}/${bugle.getPathName()}`} className="link">
            <p className="productNames">{bugle.getFullName()}</p>
          </Link>)
        }</div>
    </div>
  );
}

function Reeds({ reeds }) {
  return (
    <div>
      <Link to="/products/tags/reeds" className="link">
        <p className="columnTitle">Elk Mouth Reeds</p>
      </Link>
      <div>{map(reeds.toArray(), (reed, key) =>
        <Link key={key} to={`/products/${reed.getCategory()}/${reed.getPathName()}`} className="link">
          <p className="productNames">{reed.getFullName()}</p>
        </Link>)
      }</div>
    </div>
  );
}

function DVDs({ dvds }) {
  return (
    <div>
      <Link to="/products/tags/dvds" className="link">
        <h3 className="columnTitle">Hunting DVDs</h3>
      </Link>
      <div>{map(dvds.toArray(), (dvd, key) =>
        <Link key={key} to={`/products/${dvd.getCategory()}/${dvd.getPathName()}`} className="link">
          <p className="productNames">{dvd.getFullName()}</p>
        </Link>)
      }</div>
    </div>
  );
}

function Other({ cowCalls, other }) {
  return (
    <div>
      <Link to="/products/tags/cow-calls" className="link">
        <h3 className="columnTitle">Cow Calls</h3>
      </Link>
      <div>{map(cowCalls.toArray(), (cowCall, key) =>
        <Link key={key} to={`/products/${cowCall.getCategory()}/${cowCall.getPathName()}`} className="link">
          <p className="productNames">{cowCall.getFullName()}</p>
        </Link>)
      }</div>
      <Link to="/products/tags/other" className="link">
        <h3 className="columnTitle">Other</h3>
      </Link>
      <div>{map(other.toArray(), (otherItem, key) =>
        <Link key={key} to={`/products/${otherItem.getCategory()}/${otherItem.getPathName()}`} className="link">
          <p className="productNames">{otherItem.getFullName()}</p>
        </Link>)
      }</div>
    </div>
  );
}

export default ProductsMenu;

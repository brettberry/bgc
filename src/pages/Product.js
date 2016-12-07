import React, { Component, PropTypes } from 'react';
import QuantityPicker from '../QuantityPicker';
import Button from '../Buttons';
import './product.styles.scss';
import data from '../data.json';
import { ProductCollection } from '../models';
import classnames from 'classnames';
import map from 'lodash/map';
import slice from 'lodash/slice';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';

const products = new ProductCollection(data.products);

export default class Product extends Component {
  render() {
    const pathName = this.props.routeParams.productName;
    const product = products.findByPathName(pathName);
    return (
      <div className="productPageContainer">
        <ProductView product={product} />
        <RelatedProducts product={product} />
      </div>
    );
  }
}

function ProductView({ product }) {
  const productName = product.getFullName();
  return (
    <div className="productView">
      <h1 className="name">{productName}</h1>
      <div className="contentContainer">
        <Images />
        <Details product={product}/>
      </div>
    </div>
  );
}

function Images() {
  return (
    <div className="imgContainer">
      <div className="thumbnailsContainer">
        <div className="thumbnail" />
        <div className="thumbnail" />
        <div className="thumbnail" />
      </div>
      <div className="mainImg" />
    </div>
  );
}

function Details({ product }) {
  const price = product.getPrice().getAmount();
  const discount = product.getPrice().getDiscount();
  const showDiscount = !!discount;
  return (
    <div className="details">
      <div className="priceContainer">
        <h2 className={classnames('price', showDiscount && 'strike')}>${price}</h2>
        {showDiscount && <h2 className="discount">${discount}</h2>}
      </div>
      <h3 className="shipping">+ Flatrate shipping: $2.95</h3>
      <div className="buttonContainer">
        <QuantityPicker />
        <Button text="Add To Cart" className="cartButton" />
      </div>
      <div className="descriptionContainer">
        <h3 className="descriptionTitle">Description</h3>
        <p className="description">{product.getDescription()}</p>
      </div>
    </div>
  );
}

class RelatedProducts extends Component {
  state = {
    offset: 0,
    reverse: false
  }

  pageLeft() {
    const { offset } = this.state;
    const length = this.getItems().length;
    this.setState({
      offset: (offset - 3) % length,
      reverse: true
    });
  }

  pageRight() {
    const { offset } = this.state;
    const length = this.getItems().length;
    this.setState({
      offset: (offset + 3) % length,
      reverse: false
    });
  }

  getItems() {
    const { product } = this.props;
    const category = product.getCategory();
    const items = products.filterByCategory(category);
    return items.toArray();
  }

  render() {
    const length = this.getItems().length;
    const showButtons = length > 3;
    const transitionClasses = classnames('carousel', this.state.reverse ? 'left' : 'right');
    return (
      <div className="relatedProductsContainer">
        <h2 className="subheader">Related Items</h2>
        <div className="relatedInnerDiv">
          { showButtons && <button className="paginationButton left" onClick={this.pageLeft.bind(this)}>
            <FaChevronLeft className="paginationChevron" />
          </button> }
          <ReactCSSTransitionGroup className={transitionClasses}
                                   transitionName="carousel"
                                   transitionEnterTimeout={500}
                                   transitionLeaveTimeout={500}>
            <div className="transitionContainer" key={this.state.offset}>
              {this.renderItems()}
            </div>
          </ReactCSSTransitionGroup>
          { showButtons && <button className="paginationButton right" onClick={this.pageRight.bind(this)}>
            <FaChevronRight className="paginationChevron" />
          </button> }
        </div>
      </div>
    );
  }

  renderItems() {
    const offset = Math.abs(this.state.offset);
    const itemsArray = slice(this.getItems(), offset, offset + 3);
    return map(itemsArray, (item) =>
      <div key={item.getPathName()} className="relatedItem">
        <Link to={`/products/${item.getCategory()}/${item.getPathName()}`} className="link">
          <h3 className="title">{item.getFullName()}</h3>
        </Link>
      </div>
    );
  }
}

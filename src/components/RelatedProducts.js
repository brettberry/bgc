import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import slice from 'lodash/slice';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import { Link } from 'react-router';
import classnames from 'classnames';
import map from 'lodash/map';

import { ProductCollection } from '../models';
import data from '~/data.json';


const products = new ProductCollection(data.products);

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
            <FaChevronLeft className="nextItemsChevron"/>
          </button> }
          <ReactCSSTransitionGroup className={transitionClasses}
                                   transitionName="carousel"
                                   transitionEnterTimeout={500}
                                   transitionLeaveTimeout={500}>
            <div className="transitionContainer" key={this.state.offset}>
              {this.renderItems()}
            </div>
          </ReactCSSTransitionGroup>
          { showButtons && <button className="paginationButton right"
                                   onClick={this.pageRight.bind(this)}>
            <FaChevronRight className="nextItemsChevron"/>
          </button> }
        </div>
      </div>
    );
  }

  getBackgroundImage(myProduct) {
    const images = myProduct.getMedia();
    return {
      backgroundImage: images[0]
    };
  }

  renderItems() {
    const offset = Math.abs(this.state.offset);
    const itemsArray = slice(this.getItems(), offset, offset + 3);

    return map(itemsArray, (item) =>
      <div key={item.getPathName()} className="relatedItem">
        <Link to={`/products/${item.getCategory()}/${item.getPathName()}`}
              className="link">
          <h3 className="title">{item.getFullName()}</h3>
          <div className="productImgContainer">
            <div className="productImage"
                 style={this.getBackgroundImage(item)}/>
          </div>
        </Link>
      </div>
    );
  }
}

export default class RelatedItemsRenderer extends Component {

  static propTypes = {
    isTablet: PropTypes.bool
  }

  static defaultProps = {
    isTablet: false
  }

  render() {
    return this.props.isTablet ? this.renderTablet() : this.renderDesktop();
  }

  renderTablet() {
    return (
      <div/>
    );
  }

  renderDesktop() {
    const { product } = this.props;
    return (
      <div>
        <RelatedProducts product={product}/>
      </div>
    );
  }
}

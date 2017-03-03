import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import classnames from 'classnames';
import map from 'lodash/map';
import slice from 'lodash/slice';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';

import { ProductCollection, ProductModel } from '../models';
import TabletProvider from '../TabletProvider';
import CartModal from '../CartModal';
import QuantityPicker from '../QuantityPicker';
import Button from '../Buttons';
import data from '../data.json';
import './product.styles.scss';

const products = new ProductCollection(data.products);

export default class Product extends Component {
  render() {
    const pathName = this.props.routeParams.productName;
    const product = products.findByPathName(pathName);
    return (
      <div>
        <ProductView product={product} />
        <TabletProvider>
          <RelatedItemsRenderer product={product} />
        </TabletProvider>
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
        <Images product={product}/>
        <Details product={product}/>
      </div>
    </div>
  );
}

class Images extends Component {

  static propTypes = {
    product: PropTypes.instanceOf(ProductModel)
  }

  state = {
    activeIndex: 0
  }

  getBackgroundImage(index, myProduct) {
    const images = myProduct.getMedia();
    return {
      backgroundImage: images[index]
    };
  }

  handleImageClick(index) {
    this.setState({
      activeIndex: index
    });
  }

  render() {
    const product = this.props.product;
    return (
      <div className="imgContainer">
        <div className="thumbnailsContainer">

        //fix me
          {/* { for(let i=0, i<=2, i++) {
              return <div className="thumbnail" style={this.getBackgroundImage(i, product)} onClick={() => this.handleImageClick(i)} />}} */}
          {/* <div className="thumbnail" style={this.getBackgroundImage(1, product)} onClick={() => this.handleImageClick(1)} />
          <div className="thumbnail" style={this.getBackgroundImage(2, product)} onClick={() => this.handleImageClick(2)} /> */}
        </div>
        <div className="mainImg" style={this.getBackgroundImage(this.state.activeIndex, product)} />
      </div>
    );
  }
}

class Details extends Component {

  static propTypes = {
    product: PropTypes.instanceOf(ProductModel)
  }

  static contextTypes = {
    addToCart: PropTypes.func
  }

  state = {
    quantity: 1,
    showModal: false
  }

  handleClickAddToCart() {
    this.context.addToCart(this.props.product, this.state.quantity);
    this.setState({ showModal: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      this.setState({ quantity: 1 });
    }
  }

  render() {
    const { product } = this.props;
    const price = product.getPrice().getAmount().toFixed(2);
    const discount = product.getPrice().getDiscount() && product.getPrice().getDiscount().toFixed(2);
    const showDiscount = !!discount;

    return (
      <div className="details">
        <div className="priceContainer">
          <h2 className={classnames('price', showDiscount && 'strike')}>${price}</h2>
          {showDiscount && <h2 className="discount">${discount}</h2>}
        </div>
        <h3 className="shipping">+ Flatrate shipping: $2.95</h3>
        <div className="buttonContainer">
          <div className="qtyContainer">
            <QuantityPicker onQuantityChange={(quantity) => this.setState({ quantity: quantity })}
                            initialQuanity={this.state.quantity}/>
          </div>
          <Button text="Add To Cart"
                  className="cartButton"
                  onClick={this.handleClickAddToCart.bind(this)}/>
        </div>
        <div className="descriptionContainer">
          <h3 className="descriptionTitle">Description</h3>
          <p className="description">{product.getDescription()}</p>
        </div>
        <CartModal showModal={this.state.showModal}
                   closeModal={() => this.setState({ showModal: false })}
                   quantity={this.state.quantity}
                   product={this.props.product}/>
      </div>
    );
  }
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
            <FaChevronLeft className="nextItemsChevron" />
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
            <FaChevronRight className="nextItemsChevron" />
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

    //TODO: make this it's own component
    return map(itemsArray, (item) =>
      <div key={item.getPathName()} className="relatedItem">
        <Link to={`/products/${item.getCategory()}/${item.getPathName()}`}
              className="link">
          <h3 className="title">{item.getFullName()}</h3>
          <div className="productImgContainer">
            <div className="productImage"
                 style={this.getBackgroundImage(item)} />
          </div>
        </Link>
      </div>
    );
  }
}

class RelatedItemsRenderer extends Component {

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
      <div />
    );
  }

  renderDesktop() {
    const { product } = this.props;
    return (
      <div>
        <RelatedProducts product={product} />
      </div>
    );
  }
}

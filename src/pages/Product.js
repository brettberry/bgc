import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import map from 'lodash/map';

import RelatedItemsRenderer from '~/components/RelatedProducts';
import { ProductCollection, ProductModel, TagCollection } from '../models';
import TabletProvider from '~/providers/TabletProvider';
import CartModal from '~/pages/CartModal';
import QuantityPicker from '~/components/QuantityPicker';
import Button from '~/components/Buttons';
import data from '~/data.json';
import './product.styles.scss';

const products = new ProductCollection(data.products);

export default class Product extends Component {
  render() {
    const pathName = this.props.routeParams.productName;
    const product = products.findByPathName(pathName);
    return (
      <div>
        <ProductView product={product}/>
        <TabletProvider>
          <RelatedItemsRenderer product={product}/>
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
          <div className="thumbnail" style={this.getBackgroundImage(0, product)} onClick={() => this.handleImageClick(0)}/>
          <div className="thumbnail" style={this.getBackgroundImage(1, product)} onClick={() => this.handleImageClick(1)}/>
          <div className="thumbnail" style={this.getBackgroundImage(2, product)} onClick={() => this.handleImageClick(2)}/>
        </div>
        <div className="mainImg" style={this.getBackgroundImage(this.state.activeIndex, product)}/>
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
    const tags = product.getTags();

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
        <div className="tagsContainer">
          {map(tags, (tag, key) => {
            return (
            <Link to={`/products/tags/${tag}`} className="tagLink" key={key}>
              <div className="tagContainer">
                <span className="tagTitle">{tag.replace(/-/g, ' ')}</span>
              </div>
            </Link>
          );
        })}
        </div>
        <CartModal showModal={this.state.showModal}
                   closeModal={() => this.setState({ showModal: false })}
                   quantity={this.state.quantity}
                   product={this.props.product}/>
      </div>
    );
  }
}

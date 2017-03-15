import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import CartModal from '~/pages/CartModal';
import { ProductCollection } from '~/models';
import Button from './Buttons';
import data from '~/data.json';
import './homePageDemo.styles.scss';

const products = new ProductCollection(data.products);

class Demo extends Component {

  static contextTypes = {
    addToCart: PropTypes.func
  }

  state = {
    frameWidth: 0,
    frameHeight: 0,
    quantity: 1,
    product: products.findByPathName('thunder-bugle'),
    showModal: false
  }

  constructor(props) {
    super(props);
    this._updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    $(window).on('resize', this._updateDimensions);
  }

  componentWillUnmount() {
    $(window).off('resize', this._updateDimensions);
  }

  updateDimensions() {
    const screenWidth = $(window).width();
    const frameWidth = screenWidth * 0.75;
    const frameHeight = frameWidth * 0.5625;
    this.setState({ frameWidth, frameHeight });
  }

  handleClickAddToCart() {
    this.context.addToCart(this.state.product, this.state.quantity);
    this.setState({ showModal: true });
  }

  render() {
    const { frameWidth, frameHeight, product, quantity, showModal } = this.state;
    return (
      <div className="demoContainer">
        <span className="title">Meet the Revolutionary Berry Thunder Bugle</span>
        <div className="demoSection">
          <div className="demo">
            <iframe height={frameHeight}
                    width={frameWidth}
                    src={"https://www.youtube.com/embed/bLAz_kbihLE"}
                    frameBorder="0"
                    allowFullScreen/>
          </div>
          <div className="demoInfo">
            <p className="info">{product.getDescription()}</p>
              <div className="buttonContainer">
                <Link to="/products/bugles/thunder-bugle" className="link">
                  <Button text="Details" className="detailsButton" />
                </Link>
                <Button text="Add To Cart"
                        className="cartButton"
                        onClick={this.handleClickAddToCart.bind(this)}/>
              </div>
          </div>
        </div>
        <CartModal showModal={showModal}
                   closeModal={() => this.setState({ showModal: false })}
                   quantity={quantity}
                   product={product}/>
      </div>
    );
  }
}

export default Demo;

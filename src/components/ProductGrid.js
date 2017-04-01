import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import { ProductModel } from '~/models';
import '~/pages/products.styles.scss';

class ProductGrid extends Component {

  static propTypes = {
    product: PropTypes.instanceOf(ProductModel)
  }

  getBackgroundImage(myProduct) {
    const images = myProduct.getMedia();
    return {
      backgroundImage: images[0]
    };
  }

  render() {
    const product = this.props.product;
    const name = product.getFullName();
    const price = product.getPrice().getAmount().toFixed(2);
    const discount = product.getPrice().getDiscount() && product.getPrice().getDiscount().toFixed(2);
    const showDiscount = !!discount;

    return (
      <div className="container">
        <Link to={`/products/${product.getCategory()}/${product.getPathName()}`}
              className="link">
            <div className="product">
              <h3 className="title">{name}</h3>
              <div className="priceContainer">
                <p className={classnames('price', showDiscount && 'strike')}>${price}</p>
                { showDiscount && <p className="discount">${discount}</p>}
              </div>
              <div className="productImgContainer">
                <div className="productImage"
                     style={this.getBackgroundImage(product)}/>
              </div>
            </div>
        </Link>
      </div>
    );
  }
}

export default ProductGrid;

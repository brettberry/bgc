import React, { Component, PropTypes } from 'react';
import Modal from 'simple-react-modal';
import clickOutside from 'react-click-outside';
import MdClose from 'react-icons/lib/md/close';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import ProductModel from './models/ProductModel';
import CartItemCollection from './models/CartItemCollection';
import Button from './Buttons';
import { Link } from 'react-router';
import './cartModal.styles.scss';

const styles = {
  minWidth: 500,
  maxWidth: 800,
  width: '100%',
  height: 500,
  top: -40,
  borderStyle: 'solid',
  borderWidth: 5,
  borderColor: '#ebb052',
  borderRadius: 10,
  padding: '25px',
  paddingTop: 0
};

class CartModal extends Component {

  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    quantity: PropTypes.number,
    product: PropTypes.instanceOf(ProductModel)
  }

  render() {
    const ModalComponent = clickOutside(CartModalContents);
    const { showModal } = this.props;
    return (
      <div>
        <Modal show={showModal}
               containerClassName="cartModal"
               containerStyle={styles}
               style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
               closeOnOuterClick={false}>
          <ModalComponent closeModal={this.props.closeModal}
                          quantity={this.props.quantity}
                          product={this.props.product} />
        </Modal>
      </div>
    );
  }
}

class CartModalContents extends Component {

  static propTypes = {
    product: PropTypes.instanceOf(ProductModel),
    quantity: PropTypes.number
  }

  handleClickOutside() {
    this.props.closeModal();
  }

  getQuantityMessage() {
    return this.props.quantity === 1 ? `You just added 1 item to your cart` : `You just added ${this.props.quantity} items to your cart`;
  }

  render() {
    return (
      <div className="cartModalContainer">
        <MdClose className="exit" onClick={this.props.closeModal} />
        <p className="continueShopping" onClick={this.props.closeModal}>continue shopping</p>
        <div className="itemsAddedContainer">
          <FaCheckCircle className="checkmark" />
          <h1 className="itemsAddedMsg">{this.getQuantityMessage()}</h1>
        </div>
        <ItemSelected product={this.props.product} quantity={this.props.quantity} />
        <ModalOrderSummary />
      </div>
    );
  }
}

class ItemSelected extends Component {

  static propTypes = {
    quantity: PropTypes.number,
    product: PropTypes.instanceOf(ProductModel)
  }

  getThumbnailImage(item) {
    const productImg = item.getMedia();
    return { backgroundImage: productImg[0] };
  }

  getItemTotal() {
    const product = this.props.product;
    const quantity = this.props.quantity;
    const itemPrice = product.getPrice().getDiscount() || product.getPrice().getAmount();
    const subtotal = itemPrice * quantity;
    return subtotal.toFixed(2);
  }

  render() {
    const product = this.props.product;
    const quantity = this.props.quantity;
    return (
      <div className="itemDetailsContainer">
        <div className="itemContainer">
          <div className="productThumbnail"
               style={this.getThumbnailImage(product)} />
          <div className="productDetailsContainer">
            <h1 className="itemSelected">{product.getFullName()}</h1>
            <h1 className="itemDetails">Quantity: {quantity}</h1>
            <h1 className="itemDetails">${product.getPrice().getDiscount() || product.getPrice().getAmount()} each</h1>
          </div>
        </div>
        <h3 className="itemSelectedTotal">${this.getItemTotal()}</h3>
      </div>
    );
  }
}

class ModalOrderSummary extends Component {

  static contextTypes = {
    cart: PropTypes.instanceOf(CartItemCollection)
  }

  render() {
    const cart = this.context.cart;
    return (
      <div className="totalsCheckoutContainer">
        <div className="subtotalContainer">
          <h3 className="subtotal">Subtotal</h3>
          <h3 className="subtotal">${cart.getCartTotal().toFixed(2)}</h3>
        </div>
        <div className="subtotalContainer">
          <h3 className="subtotal">Shipping</h3>
          <h3 className="subtotal">$2.95</h3>
        </div>
        <div className="horizontalRule" />
        <div className="subtotalContainer">
          <h3 className="total">Total</h3>
          <h3 className="total">${(cart.getCartTotal() + 2.95).toFixed(2)}</h3>
        </div>
        <Link to="/cart" className="link">
          <Button text="Check Out" />
        </Link>
      </div>
    );
  }
}

export default CartModal;

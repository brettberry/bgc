import React, { Component, PropTypes } from 'react';
import Modal from 'simple-react-modal';
import clickOutside from 'react-click-outside';
import MdClose from 'react-icons/lib/md/close';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import ProductModel from './models/ProductModel';
import './cartModal.styles.scss';

const styles = {
  minWidth: 500,
  maxWidth: 800,
  width: '100%',
  height: 600,
  top: -40,
  borderStyle: 'solid',
  borderWidth: 5,
  borderColor: '#ebb052',
  borderRadius: 10
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
                          quantity={this.props.quantity} />
        </Modal>
      </div>
    );
  }
}

class CartModalContents extends Component {

  static propTypes = {
    quantity: PropTypes.number
  }

  handleClickOutside() {
    this.props.closeModal();
  }

  render() {
    return (
      <div className="cartModalContainer">
        <MdClose className="exit" onClick={this.props.closeModal} />
        <div className="itemsAddedContainer">
          <FaCheckCircle className="checkmark" />
          <h1 className="itemsAddedMsg">{this.getQuantityMessage()}</h1>
        </div>
        <div className="modalContents">
        </div>
      </div>
    );
  }

  getQuantityMessage() {
    return this.props.quantity === 1 ? `You just added 1 item to your cart` : `You just added ${this.props.quantity} items to your cart`;
  }
}

export default CartModal;

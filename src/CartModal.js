import React, { Component, PropTypes } from 'react';
import Modal from 'simple-react-modal';
import clickOutside from 'react-click-outside';
import MdClose from 'react-icons/lib/md/close';
import './cartModal.styles.scss';

class CartModal extends Component {

  props = {
    showModal: false
  }

  render() {
    const ModalComponent = clickOutside(CartModalContents);
    const { showModal } = this.state;
    return (
      <div>
        <Modal show={showModal}
               containerClassName="cartModal"
               closeOnOuterClick={false}>
          <ModalComponent closeModal={() => this.setState({ showModal: false })} />
        </Modal>
      </div>
    );
  }
}

class CartModalContents extends Component {

  handleClickOutside() {
    this.props.closeModal();
  }

  render() {
    return (
      <div className="cartModalContainer">
        <MdClose className="exit" onClick={this.props.closeModal} />
        <div className="modalContents">
        </div>
      </div>
    );
  }
}

export default CartModal;

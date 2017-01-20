import React, { Component, PropTypes } from 'react';
import ShippingInfoModel from '../../shipping/src/models/ShippingInfoModel';
import CartItemCollection from '../models/CartItemCollection';
import Button from '../Buttons';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import FaLock from 'react-icons/lib/fa/lock';
import classnames from 'classnames';
import Checkbox from 'material-ui/Checkbox';
import { Link } from 'react-router';
import braintree from 'braintree-web';
import map from 'lodash/map';
import './checkout.styles.scss';

class Checkout extends Component {

  static contextTypes = {
    getCurrentUser: PropTypes.func,
    router: PropTypes.object,
    saveShippingInfo: PropTypes.func,
    shippingInfo: PropTypes.instanceOf(ShippingInfoModel),
    getShippingInfo: PropTypes.func,
    updateShippingInfo: PropTypes.func,
    createClientToken: PropTypes.func,
    clientToken: PropTypes.string,
    createTransaction: PropTypes.func,
    cart: PropTypes.instanceOf(CartItemCollection)
  }

  state = {
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: ''
  }

  componentDidMount() {
    this.context.getShippingInfo()
      .then(() => this.setupFormData())
      .then(() => this.loadBraintreeToken());
  }

  loadBraintreeToken() {
    return this.context.createClientToken()
    .then((clientToken) => {
      braintree.setup(clientToken, 'dropin', {
        container: 'braintree_ui',
        paypal: {
          button: {
            type: 'checkout'
          }
        },
        onPaymentMethodReceived: (paymentInfo) => {
          const amount = this.context.cart.getCartTotal().toFixed(2);
          this.context.createTransaction(amount, paymentInfo.nonce)
          .then(() => this.context.router.push('/checkout/success'));
        }
      });
    });
  }

  setupFormData() {
    const shippingInfo = this.context && this.context.shippingInfo;
    this.setState({
      firstName: shippingInfo && shippingInfo.getFirstName(),
      lastName: shippingInfo && shippingInfo.getLastName(),
      phone: shippingInfo && shippingInfo.getPhone(),
      addressLine1: shippingInfo && shippingInfo.getAddressLine1(),
      addressLine2: shippingInfo && shippingInfo.getAddressLine2(),
      city: shippingInfo && shippingInfo.getCity(),
      state: shippingInfo && shippingInfo.getState(),
      zip: shippingInfo && shippingInfo.getZip()
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const shippingId = this.context.shippingInfo && this.context.shippingInfo.getId();
    const shippingInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      addressLine1: this.state.addressLine1,
      addressLine2: this.state.addressLine2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      id: shippingId
    };

    if (shippingId) {
      return this.context.updateShippingInfo(shippingInfo);
    }
    this.context.saveShippingInfo(shippingInfo);
  }

  render() {
    return (
      <div>
        <div className="checkoutHeaderBar">
          <div className="checkoutHeaderContainer">
            <h1 className="logo">Berry Game Calls</h1>
            <h3 className="checkoutSubtitle">Checkout</h3>
          </div>
          <Link to="/cart">
            <FaShoppingCart className="cart" />
          </Link>
        </div>
        <div className="shippingInfoContainer">
          <form onSubmit={this.handleSubmit.bind(this)} className="form">
            <BillingInformation />
            <ShippingInformation />
            <PaymentInformation />
            <ReviewOrder />
            <div className="buttonContainer">
              <Button text="Place Order"
                      className="placeOrderButton"
                      onClick={this.handleSubmit.bind(this)} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function StepBubble({ value }) {
  return (
    <div className="circle">
      <h2 className="number">{value}</h2>
    </div>
  );
}

class BillingInformation extends Component {

  state = {
    showBillingForm: true
  }

  render() {
    return (
      <div>
        <div className="sectionTitleContainer"
             onClick={() => this.setState({ showBillingForm: !this.state.showBillingForm })}>
          <StepBubble value="1" />
          <h1 className="header">Billing Information</h1>
        </div>
        <div className={classnames(this.state.showBillingForm ? 'billingFormContainer showForm' : 'billingFormContainer hideForm')}>
          <p className="formDetails">Enter your billing information below.</p>
          <div className="nameContainer">
            <label className="inputLabel halfWidth">
              <span className="inputSpan">First Name</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ firstName: e.target.value })} />
            </label>
            <label className="inputLabel halfWidth">
              <span className="inputSpan">Last Name</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ lastName: e.target.value })} />
            </label>
          </div>
          <div className="addressContainer">
            <label className="inputLabel fullWidth">
              <span className="inputSpan">Address</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ addressLine1: e.target.value })} />
            </label>
            <label className="inputLabel fullWidth">
              <span className="inputSpan">Apt, suite, etc (optional)</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ addressLine2: e.target.value })} />
            </label>
          </div>
          <div className="locationContainer">
            <label className="inputLabel halfWidth">
              <span className="inputSpan">City</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ city: e.target.value })} />
            </label>
            <label className="inputLabel quarterWidth">
              <span className="inputSpan">State</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ state: e.target.value })} />
            </label>
            <label className="inputLabel quarterWidth">
              <span className="inputSpan">ZIP</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ zip: e.target.value })} />
            </label>
          </div>
          <div className="phoneEmailContainer">
            <label className="inputLabel halfWidth">
              <span className="inputSpan">Phone Number</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ phone: e.target.value })} />
            </label>
            <label className="inputLabel halfWidth">
              <span className="inputSpan">Email</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ email: e.target.value })} />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

class ShippingInformation extends Component {

  state = {
    showShippingForm: false
  }

  render() {

    const styles = {
      checkbox: {
        width: 25
      }
    };

    return (
      <div>
        <div className="sectionTitleContainer"
             onClick={() => this.setState({ showShippingForm: !this.state.showShippingForm })}>
          <StepBubble value="2" />
          <h1 className="header shipping">Shipping Information</h1>
        </div>
        <div className={classnames(this.state.showShippingForm ? 'shippingFormContainer showForm' : 'shippingFormContainer hideForm')}>
          <div className="shippingOptionContainer">
            <Checkbox style={styles.checkbox}
                      iconStyle={{ fill: '#ebb052' }} />
            <p className="formDetails">ship to billing address</p>
          </div>
          <div className="nameContainer">
            <label className="inputLabel halfWidth">
              <span className="inputSpan">First Name</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ firstName: e.target.value })} />
            </label>
            <label className="inputLabel halfWidth">
              <span className="inputSpan">Last Name</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ lastName: e.target.value })} />
            </label>
          </div>
          <div className="addressContainer">
            <label className="inputLabel fullWidth">
              <span className="inputSpan">Address</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ addressLine1: e.target.value })} />
            </label>
            <label className="inputLabel fullWidth">
              <span className="inputSpan">Apt, suite, etc (optional)</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ addressLine2: e.target.value })} />
            </label>
          </div>
          <div className="locationContainer">
            <label className="inputLabel halfWidth">
              <span className="inputSpan">City</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ city: e.target.value })} />
            </label>
            <label className="inputLabel quarterWidth">
              <span className="inputSpan">State</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ state: e.target.value })} />
            </label>
            <label className="inputLabel quarterWidth">
              <span className="inputSpan">ZIP</span>
              <input className="formInput"
                     onChange={(e) => this.setState({ zip: e.target.value })} />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

class PaymentInformation extends Component {

  static contextTypes = {
    cart: PropTypes.instanceOf(CartItemCollection)
  }

  state = {
    showPaymentForm: false
  }

  render() {
    return (
      <div>
        <div className="sectionTitleContainer"
             onClick={() => this.setState({ showPaymentForm: !this.state.showPaymentForm })}>
          <StepBubble value="3" />
          <h1 className="header">Payment Method</h1>
        </div>
        <div className={classnames(this.state.showPaymentForm ? 'paymentFormContainer showForm' : 'paymentFormContainer hideForm')}>
          <div className="payDetailsContainer">
            <FaLock className="lock" />
            <p className="formDetails">Check out with&nbsp;</p>
              <a href="https://www.paypal.com/us/webapps/mpp/paypal-popup"
                 target="_blank"
                 className="formDetails paypal">Paypal</a>
            <p className="formDetails">, or fill out the secure form below.</p>
          </div>
          <div id="braintree_ui" className="braintreeUI"/>
        </div>
      </div>
    );
  }
}

class ReviewOrder extends Component {

  static contextTypes = {
    cart: PropTypes.instanceOf(CartItemCollection)
  }

  state = {
    showOrderForm: false
  }

  getThumbnailImage(item) {
      const productImg = item.getMedia();
      return { backgroundImage: productImg[0] };
  }

  render() {
    return (
      <div>
        <div className="sectionTitleContainer"
             onClick={() => this.setState({ showOrderForm: !this.state.showOrderForm })}>
          <StepBubble value="4" />
          <h1 className="header">Review Order</h1>
        </div>
        <div className={classnames(this.state.showOrderForm ? 'reviewOrderContainer showForm' : 'reviewOrderContainer hideForm')}>
          <div className="orderContainer">
            <div className="reviewItemsContainer">
              {map(this.context.cart.toArray(), this.renderCartItem.bind(this))}
            </div>
            <OrderSummary />
          </div>
          <h1 className="amountDueHeader">Amount Due: ${(this.context.cart.getCartTotal() + 2.95).toFixed(2)}</h1>
          <Link to="/cart" className="link">
            <p className="viewCart">edit order</p>
          </Link>
        </div>
      </div>
    );
  }

  renderCartItem(item, index) {
    return (
      <div key={index} className="itemContainer">
        <div className="description">
          <div className="img" style={this.getThumbnailImage(item)} />
          <div className="item">{item.getFullName()}</div>
        </div>
        <div className="quantity">x {item.getQuantity()}</div>
      </div>
    );
  }
}

class OrderSummary extends Component {

  static contextTypes = {
    cart: PropTypes.instanceOf(CartItemCollection)
  }

  render() {
    const cart = this.context.cart;
    return (
      <div className="myOrderSummary">
        <div className="totalContainer">
          <div className="cartTotal">
            <p className="item">Subtotal</p>
            <p className="itemValue">${cart.getCartTotal().toFixed(2)}</p>
          </div>
          <div className="cartTotal">
            <p className="item">Tax</p>
            <p className="itemValue">$0.00</p>
          </div>
          <div className="cartTotal">
            <p className="item">Shipping</p>
            <p className="itemValue">$2.95</p>
          </div>
          <div className="horizontalRule" />
          <div className="cartTotal">
            <p className="totalHeader">Total</p>
            <p className="totalValue">${(cart.getCartTotal() + 2.95).toFixed(2)}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;

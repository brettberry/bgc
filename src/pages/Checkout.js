import React, { Component, PropTypes } from 'react';
import ShippingInfoModel from '../../shipping/src/models/ShippingInfoModel';
import CartItemCollection from '../models/CartItemCollection';
import braintree from 'braintree-web';
import './checkout.styles.scss';

class Checkout extends Component {

  static contextTypes = {
    getCurrentUser: PropTypes.func,
    logout: PropTypes.func,
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
    this.loadUser()
      .then(() => this.context.getShippingInfo())
      .then(() => this.setupFormData())
      .then(() => this.loadBraintreeToken());
  }

  loadUser() {
    return this.context.getCurrentUser()
      .catch(() => {
        this.context.router.push({
          pathname: '/login',
          query: { redirectTo: '/checkout' }
        });
      });
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
      <div className="shippingInfoContainer">
        <form onSubmit={this.handleSubmit.bind(this)} className="form">
          <h1 className="shipHeader">Shipping Information</h1>
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
              <span className="inputSpan">Address</span>
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
          <h1 className="shipHeader">Payment Information</h1>
          <div id="braintree_ui" className="braintreeUI"/>
          <button type="submit" onClick={this.handleSubmit.bind(this)} className="button">Submit</button>
        </form>
        {/* <button onClick={this.context.logout}>Log out</button> */}
      </div>
    );
  }
}

export default Checkout;

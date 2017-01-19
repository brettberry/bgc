import React, { Component, PropTypes } from 'react';
import ShippingInfoModel from '../../shipping/src/models/ShippingInfoModel';
import CartItemCollection from '../models/CartItemCollection';
import Button from '../Buttons';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import Checkbox from 'material-ui/Checkbox';
import { Link } from 'react-router';
import braintree from 'braintree-web';
import map from 'lodash/map';
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
      <div>
        <div className="checkoutHeaderBar">
          <h1 className="logo">Berry Game Calls</h1>
          <Link to="/cart">
            <FaShoppingCart className="cart" />
          </Link>
        </div>
        <div className="shippingInfoContainer">
          <form onSubmit={this.handleSubmit.bind(this)} className="form">
            <BillingInformation />
            <ShippingInformation />
            <PaymentInformation cart={this.context.cart}/>
            <ReviewOrder />
            <div className="buttonContainer">
              <Button text="Place Order"
                      className="placeOrderButton"
                      onClick={this.handleSubmit.bind(this)} />
            </div>
          </form>
          {/* <button onClick={this.context.logout}>Log out</button> */}
        </div>
      </div>
    );
  }
}

function BillingInformation() {
  return (
    <div>
      <div className="sectionTitleContainer">
        <StepBubble value="1" />
        <h1 className="shipHeader">Billing Information</h1>
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
  );
}

function ShippingInformation() {
  const styles = {
    checkbox: {
      width: 25
    }
  };

  return (
    <div>
      <div className="sectionTitleContainer">
        <StepBubble value="2" />
        <h1 className="shipHeader">Shipping Information</h1>
      </div>
      <div className="shippingOptionContainer">
        <Checkbox style={styles.checkbox}
                  iconStyle={{ fill: '#ebb052' }} />
        <p className="shippingOption">ship to billing address</p>
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
  );
}

function PaymentInformation({ cart }) {
  return (
    <div>
      <div className="paymentSectionTitleContainer">
        <StepBubble value="3" />
        <h1 className="paymentHeader">Payment Method</h1>
      </div>
      <p className="paymentDirections">Check out with Paypal, or enter your payment information below.</p>
      <div id="braintree_ui" className="braintreeUI"/>
    </div>
  );
}

function StepBubble({ value }) {
  return (
    <div className="circle">
      <h2 className="number">{value}</h2>
    </div>
  );
}

class ReviewOrder extends Component {

  static contextTypes = {
    cart: PropTypes.instanceOf(CartItemCollection)
  }

  getThumbnailImage(item) {
      const productImg = item.getMedia();
      return { backgroundImage: productImg[0] };
  }

  render() {
    return (
      <div>
        <div className="sectionTitleContainer">
          <StepBubble value="4" />
          <h1 className="shipHeader">Review Order</h1>
        </div>
        <div className="reviewItemsContainer">
          {map(this.context.cart.toArray(), this.renderCartItem.bind(this))}
        </div>
        <h1 className="amountDueHeader">Amount Due: ${(this.context.cart.getCartTotal() + 2.95).toFixed(2)}</h1>
        <Link to="/cart" className="link">
          <p className="viewCart">edit order</p>
        </Link>
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

export default Checkout;

import React, { Component, PropTypes } from 'react';
import ShippingInfoModel from '../../shipping/src/models/ShippingInfoModel';
import CartItemCollection from '../models/CartItemCollection';
import Checkbox from 'material-ui/Checkbox';
import { Link } from 'react-router';
import braintree from 'braintree-web';
import './checkout.styles.scss';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';

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
    email: '',
    stepIndex: 0
  }

  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
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

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <p>
            {'step 1'}
          </p>);
      case 1:
        return (
          <p>
            {'step 2'}
          </p>);
      case 2:
        return (
          <p>
            {'step 3'}
          </p>);
    }
  }

  handleNext() {
   const { stepIndex } = this.state;
   if (stepIndex < 2) {
     this.setState({ stepIndex: stepIndex + 1 });
   }
 }

 handlePrev() {
   const { stepIndex } = this.state;
   if (stepIndex > 0) {
     this.setState({ stepIndex: stepIndex - 1 });
   }
 }

  render() {
    const { stepIndex } = this.state;
    return (
      <div className="shippingInfoContainer">
        <div style={{ width: '100%', maxWidth: 1000, margin: 'auto' }}>
          <Stepper activeStep={stepIndex} connector={ <ArrowForwardIcon /> }>
            <Step>
              <StepLabel>View Cart</StepLabel>
            </Step>
            <Step>
              <StepLabel>Enter Billing & Shipping Information</StepLabel>
            </Step>
            <Step>
              <StepLabel>Add Payment Information</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirm Order</StepLabel>
            </Step>
          </Stepper>
          {this.getStepContent(stepIndex)}
        </div>
        <form onSubmit={this.handleSubmit.bind(this)} className="form">
          <BillingInformation />
          <ShippingInformation />
          <PaymentInformation cart={this.context.cart}/>
          <div className="buttonContainer">
            <button type="submit" onClick={this.handleSubmit.bind(this)} className="button">Place order</button>
          </div>
        </form>
        {/* <button onClick={this.context.logout}>Log out</button> */}
      </div>
    );
  }
}

function BillingInformation() {
  return (
    <div>
      <h1 className="shipHeader">Billing Information</h1>
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
      <h1 className="paymentHeader">Shipping Information</h1>
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
      <h1 className="paymentHeader">Payment Information</h1>
      <p className="paymentDirections">Check out with Paypal, or enter your payment information below.</p>
      <div id="braintree_ui" className="braintreeUI"/>
      <h1 className="amountDueHeader">Amount Due: ${(cart.getCartTotal() + 2.95).toFixed(2)}</h1>
      <Link to="/cart" className="link">
        <p className="viewCart">view cart</p>
      </Link>
    </div>
  );
}

export default Checkout;

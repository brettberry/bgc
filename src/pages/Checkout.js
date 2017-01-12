import React, { Component, PropTypes } from 'react';
import ShippingInfoModel from '../../shipping/src/models/ShippingInfoModel';
import CartItemCollection from '../models/CartItemCollection';
import TextField from 'material-ui/TextField';
import { orange800 } from 'material-ui/styles/colors';
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

    const styles = {
      underlineStyle: {
        borderColor: orange800
      },
      floatingLabelStyle: {
        color: orange800
      },
      floatingLabelFocusStyle: {
        color: orange800
      }
    };

    return (
      <div className="shippingInfoContainer">
        <form onSubmit={this.handleSubmit.bind(this)} className="form">
          <h1 className="shipHeader">Shipping Information</h1>
          <div className="nameContainer">
            {/* <div className="firstNameContainer"> */}
              <input className="firstNameInput"
                     placeholder="First Name"
                     onChange={(e) => this.setState({ firstName: e.target.value })} />
              <input className="firstNameInput"
                     placeholder="Last Name"
                     onChange={(e) => this.setState({ lastName: e.target.value })} />
              {/* <TextField floatingLabelText="First Name"
                         fullWidth={true}
                         underlineFocusStyle={styles.underlineStyle}
                         floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                         onChange={(e) => this.setState({ firstName: e.target.value })} /> */}
            {/* </div> */}
            {/* <div className="lastNameContainer"> */}
              {/* <TextField floatingLabelText="Last Name"
                         fullWidth={true}
                         underlineFocusStyle={styles.underlineStyle}
                         floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                         onChange={(e) => this.setState({ lastName: e.target.value })} /> */}
            {/* </div> */}
          </div>
          <div className="addressContainer">
            <TextField floatingLabelText="Street Address"
                       fullWidth={true}
                       underlineFocusStyle={styles.underlineStyle}
                       floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                       onChange={(e) => this.setState({ addressLine1: e.target.value })} />
          </div>
          <div className="addressContainer">
            <TextField floatingLabelText="Street Address"
                       fullWidth={true}
                       underlineFocusStyle={styles.underlineStyle}
                       floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                       onChange={(e) => this.setState({ addressLine2: e.target.value })} />
          </div>
          <div className="locationContainer">
            <div className="cityContainer">
              <TextField floatingLabelText="City"
                         fullWidth={true}
                         underlineFocusStyle={styles.underlineStyle}
                         floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                         onChange={(e) => this.setState({ city: e.target.value })} />
            </div>
            <div className="stateContainer">
              <TextField floatingLabelText="State"
                         fullWidth={true}
                         underlineFocusStyle={styles.underlineStyle}
                         floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                         onChange={(e) => this.setState({ state: e.target.value })} />
            </div>
            <div className="zipContainer">
              <TextField floatingLabelText="ZIP"
                         fullWidth={true}
                         underlineFocusStyle={styles.underlineStyle}
                         floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                         onChange={(e) => this.setState({ zip: e.target.value })} />
            </div>
          </div>
          <div className="phoneEmailContainer">
            <div className="phoneContainer">
              <TextField floatingLabelText="Phone Number"
                         fullWidth={true}
                         underlineFocusStyle={styles.underlineStyle}
                         floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                         onChange={(e) => this.setState({ phone: e.target.value })} />
            </div>
            <div className="emailContainer">
              <TextField floatingLabelText="Email"
                         fullWidth={true}
                         underlineFocusStyle={styles.underlineStyle}
                         floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                         onChange={(e) => this.setState({ email: e.target.value })} />
            </div>
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

import React, { Component, PropTypes } from 'react';
import ShippingInfoModel from '../../shipping/src/models/ShippingInfoModel';

class Checkout extends Component {

  static contextTypes = {
    getCurrentUser: PropTypes.func,
    logout: PropTypes.func,
    router: PropTypes.object,
    saveShippingInfo: PropTypes.func,
    shippingInfo: PropTypes.instanceOf(ShippingInfoModel),
    getShippingInfo: PropTypes.func
  }

  state = {
  }

  componentDidMount() {
    this.loadUser()
      .then(() => this.context.getShippingInfo())
      .then(() => this.setupFormData());
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
    this.context.saveShippingInfo({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      addressLine1: this.state.addressLine1,
      addressLine2: this.state.addressLine2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName"
                   value={this.state.firstName}
                   onChange={e => this.setState({ firstName: e.target.value })} />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName"
                   value={this.state.lastName}
                   onChange={e => this.setState({ lastName: e.target.value })} />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input id="phone"
                   value={this.state.phone}
                   onChange={e => this.setState({ phone: e.target.value })} />
          </div>
          <div>
            <label htmlFor="address1">Street Address 1</label>
            <input id="address1"
                   value={this.state.addressLine1}
                   onChange={e => this.setState({ addressLine1: e.target.value })} />
          </div>
          <div>
            <label htmlFor="address2">Street Address 2</label>
            <input id="address2"
                   value={this.state.addressLine2}
                   onChange={e => this.setState({ addressLine2: e.target.value })} />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input id="city"
                   value={this.state.city}
                   onChange={e => this.setState({ city: e.target.value })} />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input id="state"
                   value={this.state.state}
                   onChange={e => this.setState({ state: e.target.value })} />
          </div>
          <div>
            <label htmlFor="zip">ZIP</label>
            <input id="zip"
                   value={this.state.zip}
                   onChange={e => this.setState({ zip: e.target.value })} />
          </div>
          <button type="submit">Submit</button>
        </form>
        <button onClick={this.context.logout}>Log out</button>
      </div>
    );
  }
}

export default Checkout;

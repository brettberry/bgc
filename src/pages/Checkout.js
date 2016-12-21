import React, { Component, PropTypes } from 'react';

class Checkout extends Component {

  static contextTypes = {
    getCurrentUser: PropTypes.func,
    logout: PropTypes.func,
    router: PropTypes.object,
    saveShippingInfo: PropTypes.func
  }

  state = {
    
  }

  componentDidMount() {
    this.context.getCurrentUser()
      .then(user => {

      })
      .catch(() => {
        this.context.router.push({
          pathname: '/login',
          query: { redirectTo: '/checkout' }
        });
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
            <input id="firstName" onChange={e => this.setState({ firstName: e.target.value })} />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" onChange={e => this.setState({ lastName: e.target.value })} />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" onChange={e => this.setState({ phone: e.target.value })} />
          </div>
          <div>
            <label htmlFor="address1">Street Address 1</label>
            <input id="address1" onChange={e => this.setState({ addressLine1: e.target.value })} />
          </div>
          <div>
            <label htmlFor="address2">Street Address 2</label>
            <input id="address2" onChange={e => this.setState({ addressLine2: e.target.value })} />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input id="city" onChange={e => this.setState({ city: e.target.value })} />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input id="state" onChange={e => this.setState({ state: e.target.value })} />
          </div>
          <div>
            <label htmlFor="zip">ZIP</label>
            <input id="zip" onChange={e => this.setState({ zip: e.target.value })} />
          </div>
          <button type="submit">Submit</button>
        </form>
        <button onClick={this.context.logout}>Log out</button>
      </div>
    );
  }
}

export default Checkout;

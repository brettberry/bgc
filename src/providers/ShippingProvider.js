import { Component, PropTypes } from 'react';
import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';
import UserModel from '../models/UserModel';
import ShippingInfoModel from '../models/ShippingInfoModel';

class ShippingProvider extends Component {

  static childContextTypes = {
    saveShippingInfo: PropTypes.func,
    getShippingInfo: PropTypes.func,
    updateShippingInfo: PropTypes.func,
    shippingInfo: PropTypes.instanceOf(ShippingInfoModel),
    createClientToken: PropTypes.func,
    clientToken: PropTypes.string,
    createTransaction: PropTypes.func
  }

  static contextTypes = {
    user: PropTypes.instanceOf(UserModel)
  }

  state = {
    shippingInfo: null,
    clientToken: null
  }

  getChildContext() {
    return {
      saveShippingInfo: this.saveShippingInfo.bind(this),
      shippingInfo: this.state.shippingInfo,
      getShippingInfo: this.getShippingInfo.bind(this),
      updateShippingInfo: this.updateShippingInfo.bind(this),
      createClientToken: this.createClientToken.bind(this),
      clientToken: this.state.clientToken,
      createTransaction: this.createTransaction.bind(this)
    };
  }

  createClientToken() {
    return Promise.resolve()
      .then(() => fetch(`//localhost:5001/shipping/users/${this.context.user.getId()}/payments/tokens`, {
        method: 'POST'
      }))
      .then(res => res.json())
      .then(body => {
        const token = body.token;
        this.setState({ clientToken: token });
        return token;
      });
  }

  createTransaction(amount, paymentNonce) {
    return Promise.resolve()
      .then(() => fetch(`//localhost:5001/shipping/users/${this.context.user.getId()}/payments/transactions`, {
        method: 'POST',
        body: JSON.stringify({ amount, paymentNonce }),
        headers: {
          'Content-Type': 'application/json'
        }
      }))
      .then(res => res.json())
      .then(body => {});
  }

  saveShippingInfo(shippingInfo) {
    return Promise.resolve()
      .then(() => fetch(`//localhost:5001/shipping/users/${this.context.user.getId()}/addresses`, {
        method: 'POST',
        body: JSON.stringify(shippingInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      }))
      .then(res => res.json())
      .then(body => {
        const info = new ShippingInfoModel(body);
        this.setState({ shippingInfo: info });
      });
  }

  updateShippingInfo(shippingInfo) {
    return Promise.resolve()
      .then(() => fetch(`//localhost:5001/shipping/users/${this.context.user.getId()}/addresses`, {
        method: 'PUT',
        body: JSON.stringify(shippingInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      }))
      .then(res => res.json())
      .then(body => {
        const info = new ShippingInfoModel(body);
        this.setState({ shippingInfo: info });
      });
    }

  getShippingInfo() {
    return Promise.resolve()
      .then(() => fetch(`//localhost:5001/shipping/users/${this.context.user.getId()}/addresses`))
      .then(res => res.json())
      .then(body => {
        const info = new ShippingInfoModel(body[0]);
        this.setState({ shippingInfo: info });
    });
  }

  render() {
    return this.props.children;
  }
}

export default ShippingProvider;

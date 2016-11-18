import React, { Component } from 'react';
import toNumber from 'lodash/toNumber';
import clamp from 'lodash/clamp';
import isFinite from 'lodash/isFinite';

class QuantityPicker extends Component {

  state = {
    number: 1
  }

  changeNumber(value) {
    const number = toNumber(value);
    const numberInRange = clamp(number, 1, 1000);
    if (isFinite(numberInRange)) {
      this.setState({ number: numberInRange });
    }
  }

  render() {
    const { number } = this.state;
    return (
      <div>
        <input onChange={e => this.changeNumber(e.target.value)}
               value={number} />
        <div>
          <button onClick={() => this.changeNumber(number + 1)}>+</button>
          <button onClick={() => this.changeNumber(number - 1)}>-</button>
        </div>
      </div>
    );
  }
}

export default QuantityPicker;

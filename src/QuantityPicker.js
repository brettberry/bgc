import React, { Component } from 'react';
import toNumber from 'lodash/toNumber';
import clamp from 'lodash/clamp';
import isFinite from 'lodash/isFinite';
import FaChevronUp from 'react-icons/lib/fa/chevron-up';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';
import './quantityPicker.styles.scss'

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
      <div className="pickerContainer">
        <input onChange={e => this.changeNumber(e.target.value)}
               value={number}
               className="input" />
        <div className="buttonContainer">
          <button onClick={() => this.changeNumber(number + 1)}
                  className="up">
            <FaChevronUp className="chevron"/>
          </button>
          <button onClick={() => this.changeNumber(number - 1)}
                  className="down">
            <FaChevronDown className="chevron" />
          </button>
        </div>
      </div>
    );
  }
}

export default QuantityPicker;

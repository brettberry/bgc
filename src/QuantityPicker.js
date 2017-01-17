import React, { Component, PropTypes } from 'react';
import toNumber from 'lodash/toNumber';
import clamp from 'lodash/clamp';
import isFinite from 'lodash/isFinite';
import FaChevronUp from 'react-icons/lib/fa/chevron-up';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';
import './quantityPicker.styles.scss'

class QuantityPicker extends Component {

  static propTypes = {
    onQuantityChange: PropTypes.func,
    initialQuanity: PropTypes.number
  }

  static defaultProps = {
    initialQuanity: 1
  }

  constructor(props) {
    super(props);
    this.state = {
      number: props.initialQuanity
    };
  }

  changeNumber(value) {
    const number = toNumber(value);
    const numberInRange = clamp(number, 1, 1000);
    if (isFinite(numberInRange)) {
      this.setState({ number: numberInRange });
      this.props.onQuantityChange(numberInRange);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialQuanity !== this.props.initialQuanity) {
      this.setState({ number: this.props.initialQuanity });
    }
  }

  render() {
    const { number } = this.state;
    return (
      <div className="pickerContainer">
        <input onChange={e => this.changeNumber(e.target.value)}
               value={number}
               className="input" />
        <div className="pickerButtonContainer">
          <button onClick={() => this.changeNumber(number + 1)}
                  className="up">
            <FaChevronUp className="pickerChevron"/>
          </button>
          <button onClick={() => this.changeNumber(number - 1)}
                  className="down">
            <FaChevronDown className="pickerChevron" />
          </button>
        </div>
      </div>
    );
  }
}

export default QuantityPicker;

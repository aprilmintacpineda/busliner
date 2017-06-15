import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputNumber extends Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    let incremented_value = this.props.value + 1;

    if(incremented_value <= this.props.max) {
      this.props.onChange(incremented_value);
    }
  }

  decrement() {
    let decremented_value = this.props.value - 1;

    if(decremented_value >= this.props.min) {
      this.props.onChange(decremented_value);
    }
  }

  render() {
    return (
      <div className="input-number-wrapper">
        <ul>
          <li><input type="text" value={this.props.value} readOnly={true} /></li>
          <li>
            <div>
              <a onClick={this.increment} className="increment"><i className="fa fa-chevron-up" aria-hidden="true"></i></a>
              <a onClick={this.decrement} className="decrement"><i className="fa fa-chevron-down" aria-hidden="true"></i></a>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default InputNumber;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputText extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
    disabled: PropTypes.bool.isRequired,
    children: PropTypes.element,
    password: PropTypes.bool,
    maxlength: PropTypes.number.isRequired
  }

  render() {
    let errors = this.props.errors.map((error, index) => <p className="errors" key={index}>{error}</p>);

    return (
      <div className="input-area-wrapper">
        <div className="input-type-box">
          <input
            maxLength={this.props.maxlength}
            ref="input"
            type={this.props.password? 'password' : 'text'}
            value={this.props.value}
            onChange={changeEvent => this.props.onChange(changeEvent.target.value)}
            placeholder={this.props.placeholder} /><br/>
          {this.props.children}
        </div>
        {this.props.errors.length? <div className="error-list">{errors}</div> : null}
      </div>
    );
  }
}

export default InputText;
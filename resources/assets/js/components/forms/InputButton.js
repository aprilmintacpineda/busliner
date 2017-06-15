import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputButton extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    sending: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    errors: PropTypes.array,
    className: PropTypes.string
  }

  render() {
    let errors = this.props.errors?
      this.props.errors.map((error, index) => <p className="errors" key={index}>{error}</p>)
    : null;

    return (
      <div className={this.props.className? 'input-button-wrapper ' + this.props.className : 'input-button-wrapper'}>
        {errors}
        {this.props.sending?
          <div
            className={this.props.disabled? 'button icon-active disabled' : 'button icon-active'}
            onClick={() => !this.props.disabled? this.props.onClick() : false}>
            <div className="sending">
              <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
            </div>
            {this.props.value}
          </div>
        : <div
          className={this.props.disabled? 'button disabled' : 'button'}
          onClick={() => !this.props.disabled? this.props.onClick() : false}>
            {this.props.value}
          </div> }
      </div>
    );
  }
}

export default InputButton;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputButton extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    sending: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired
  }

  render() {
    return (
      <div onClick={() => !this.props.disabled? this.props.onClick() : false}>
        {this.props.sending?
          <div className={this.props.disabled? 'button icon-active disabled' : 'button icon-active'}>
            <div className="sending">
              <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
            </div>
            {this.props.value}
          </div>
        : <div className={this.props.disabled? 'button disabled' : 'button'}>
            {this.props.value}
          </div> }
      </div>
    );
  }
}

export default InputButton;
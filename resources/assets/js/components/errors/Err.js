import React, { Component } from 'react';
import PropTypes from 'prop-types';

import settings from '../../_settings';

class Err extends Component {
  static propTypes = {
    body: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="error-body-wrapper">
        <div className="error-body">
          <h1>Opsss... We got an error.</h1>
          <p>{this.props.body}</p>
        </div>
      </div>
    );
  }
}

export default Err;
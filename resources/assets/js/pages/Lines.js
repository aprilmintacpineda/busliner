import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Topbar from '../containers/Topbar';
import Footer from '../components/Footer';
import PopMessage from '../components/PopMessage';

import settings from '../_settings';

import * as actions from '../actions/linesActions';

class Lines extends Component {
  componentWillMount() {
    if(!this.props.lines.request.sending && !this.props.lines.data.length) {
      this.props.fetchData();
    }
  }

  render() {
    return (
      <div className="travel-lines">
        {this.props.lines.request.error?
          <PopMessage
            title="Opsss... We got an error."
            message={this.props.lines.request.error}
            onClick={() => this.props.clearRequestError()}
          />
        : null}

        <Topbar />

        Lines

        <Footer />
      </div>
    );
  }
}

export default connect(store => ({
  lines: {...store.lines}
}), {
  fetchData: actions.fetchData,
  clearRequestError: actions.clearRequestError
})(Lines);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Topbar from '../containers/Topbar';
import Footer from '../components/Footer';
import PopMessage from '../components/PopMessage';

import settings from '../_settings';
import { toFormalDateTime } from '../helpers/DateTime';
import * as actions from '../actions/linesActions';

class Lines extends Component {
  componentWillMount() {
    if(!this.props.lines.request.sending && !this.props.lines.data.length) {
      this.props.fetchData();
    }
  }

  render() {
    let lines = this.props.lines.data.map((line, index) => (
      <div className="line-wrapper" key={index}>
        <img src={settings.storage_path + '/' + line.cover_image} />

        <div className="line-details">
          <h1>To {line.destination}</h1>
          <p>Schedule: {toFormalDateTime(line.schedule)}</p>
          <div className="buttons">
            <Link to={'/travel-lines/' + line.id}>
              More Details
              <span className="decor" />
            </Link>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="travel-lines">
        {this.props.lines.request.error && this.props.lines.data.length?
          <PopMessage
            title="Opsss... We got an error."
            message={this.props.lines.request.error}
            onClick={() => this.props.clearRequestError()}
          />
        : null}

        <Topbar />

        <div className="travel-lines-schedules-wrapper">
          {this.props.lines.request.sending?
            <div className="loading-content">
              <div className="loading">
                <i className="fa fa-circle-o-notch fa-3x fast-spin"></i>
              </div>
            </div>
          : this.props.lines.request.error && !this.props.lines.data.length?
            <div className="error-container">
              <h1>Opsss... We got an error.</h1>
              <p>{this.props.lines.request.error}</p>
            </div>
          : lines}
        </div>

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
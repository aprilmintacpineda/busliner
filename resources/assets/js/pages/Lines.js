import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Topbar from '../containers/Topbar';
import Footer from '../components/Footer';
import PopMessage from '../components/PopMessage';
import Err from '../components/errors/Err';

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
    console.log(this.props.lines.data);

    let lines = this.props.lines.data.map((line, index) => (
      <div className="line-wrapper" key={index}>
        <img src={settings.storage_path + '/' + line.terminal.cover_image} />

        <div className="line-details">
          <h1>To {line.terminal.terminal_name}</h1>
          {line.is_close?
            <div className="flag-negative">
              <p><span className="label">Status</span>Closed</p>
              <p><span className="label">Close reason</span>{this.props.line.close_reason}</p>
            </div>
          : line.reservations.length == line.max_passengers?
            <p className="flag-negative"><span className="label">Status</span>Full</p>
          : <p className="flag-positive"><span className="label">Status</span>Open</p>}
          <p><span className="label">Date and time of departure</span> {toFormalDateTime(line.date_leaving)}</p>
          <p><span className="label">Estimated date and time of arrival</span> {toFormalDateTime(line.date_arriving)}</p>
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
            <Err body={this.props.lines.request.error} />
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
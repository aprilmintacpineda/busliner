import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Topbar from '../containers/Topbar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import PopMessage from '../components/PopMessage';

import InputNumber from '../components/forms/InputNumber';
import InputButton from '../components/forms/InputButton';

import E404 from '../components/errors/E404';
import Err from '../components/errors/Err';

import { toFormalDateTime } from '../helpers/DateTime';
import settings from '../_settings';
import * as lineActions from '../actions/lineActions';
import * as reservationActions from '../actions/reservationActions';

class Line extends Component {
  componentWillMount() {
    if(!this.props.line.request.status) {
      this.props.fetchData(this.props.params.id);
    }
  }

  componentWillUnmount() {
    this.props.clearData();
  }

  render() {
    let images = this.props.line.data.photos.map((photo, index) => (
      <img key={index} src={settings.storage_path + '/' + photo.file_name} />
    ));

    return (
      <div className="travel-line">
        <Topbar />

        {this.props.reservation.request.status == 'successful'?
          <PopMessage
          title="Reservation successful"
          message={this.props.reservation.request.message}
          onClick={this.props.clearReservationMessage} />
        : this.props.reservation.request.message?
          <PopMessage
          title="Opsss... We got an error."
          message={this.props.reservation.request.message}
          onClick={this.props.clearReservationMessage} />
        : null}

        {this.props.line.request.sending?
          <div className="loading-content">
            <div className="loading">
              <i className="fa fa-circle-o-notch fa-3x fast-spin"></i>
            </div>
          </div>
        : this.props.line.request.error == 404?
          <E404 />
        : this.props.line.request.error?
          <Err body={this.props.line.request.error} />
        : this.props.line.request.status == 'fetched'?
          <div className="travel-line">
            <Carousel
              items={images}
              speed={20} />

            <div className="line-wrapper">
              <div className="left-column">
                <section>
                  <img src={settings.storage_path + '/' + this.props.line.data.terminal.cover_image} />
                  <h1 className="section-title">Terminal information</h1>
                  
                  <div className="indented-info">
                    <h1>{this.props.line.data.terminal.terminal_name}</h1>
                    <p><span className="label">Address</span>{this.props.line.data.terminal.full_address}</p>
                  </div>
                </section>
              </div>

              <div className="right-column">
                <section>
                  <h1 className="section-title">Line information</h1>
                  
                  <div className="indented-info">
                    <p><span className="label">Trace number</span>{this.props.line.data.id}</p>

                    {this.props.line.data.is_close?
                      <div className="flag-negative">
                        <p><span className="label">Status</span>Closed</p>
                        <p><span className="label">Close reason</span>{this.props.line.data.close_reason}</p>
                      </div>
                    : this.props.line.data.reservations.length == this.props.line.data.max_passengers?
                      <p className="flag-negative"><span className="label">Status</span>Full</p>
                    : <p className="flag-positive"><span className="label">Status</span>Open</p>}

                    <p><span className="label">Date and time of departure</span>{toFormalDateTime(this.props.line.data.date_leaving)}</p>
                    <p><span className="label">Estimated date and time of arrival</span>{toFormalDateTime(this.props.line.data.date_arriving)}</p>
                    <p><span className="label">Reserved passengers</span>{this.props.line.data.reservations.length} {this.props.line.data.reservations.length > 1 || this.props.line.data.reservations.length == 0? 'Passengers' : 'Passenger'}</p>
                  </div>

                  <h1 className="section-title">Reserve your seat now</h1>

                  <div className="indented-info">
                    {this.props.user.logged_in?
                      <div>
                        {this.props.line.data.reserved?
                          <InputButton
                            value="Cancel my reservation"
                            sending={false}
                            disabled={false}
                            onClick={() => console.log('test')} />
                        : <ul className="reserve-form-wrapper">
                            <li>Seats
                              <InputNumber
                                min={1}
                                max={10}
                                value={this.props.reservation.seats}
                                onChange={value => this.props.changeSeats(value)} />
                            </li>
                            <li>
                              <InputButton
                                value="Reserve now"
                                sending={this.props.reservation.request.sending}
                                disabled={false}
                                onClick={() => this.props.sendReservation(this.props.params.id)} />
                            </li>
                          </ul>}
                      </div>
                    : <p>You must <Link className="link-default" to="/sign-in">sign in</Link> first.</p>}
                  </div>
                </section>

                <section>
                  <img src={settings.storage_path + '/' + this.props.line.data.driver.cover_image} />
                  <h1 className="section-title">Driver information</h1>
                  
                  <div className="indented-info">
                    <p><span className="label">Name</span>{this.props.line.data.driver.first_name} {this.props.line.data.driver.middle_name} {this.props.line.data.driver.surname}</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        : null}

        <Footer />
      </div>
    );
  }
}

export default connect(store => ({
  line: {...store.line},
  reservation: {...store.reservation},
  user: {...store.user}
}), {
  fetchData: lineActions.fetchData,
  clearData: lineActions.clearData,

  changeSeats: reservationActions.changeSeats,
  sendReservation: reservationActions.send,
  clearReservationMessage: reservationActions.clearReservationMessage
})(Line);
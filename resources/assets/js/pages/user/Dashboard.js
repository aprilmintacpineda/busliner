import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as userActions from '../../actions/userActions';

import settings from '../../_settings';
import { toFormalDateTime, toUnixTimestamp, unixTimestampNow } from '../../helpers/DateTime';

import Topbar from '../../containers/Topbar';
import Footer from '../../components/Footer';

import InputButton from '../../components/forms/InputButton';
import InputNumber from '../../components/forms/InputNumber';

class Dashboard extends Component {
  componentWillMount() {
    if(!this.props.user.logged_in) {
      return this.props.router.push('/sign-in');
    }
    
    document.title = 'Reach your destination with maximum security.';
    window.scrollTo(0, 0);

    if(!this.props.user.reservations.data.length) {
      this.props.reservationListFetch();
    }
  }

  render() {
    console.log(this.props.user.reservations);

    let reservationsList = this.props.user.reservations.data.map((reservation, index) => (
      <div className="reservation-wrapper" key={index}>
        <section>
          <h1 className="section-title">Reservation information</h1>

          <div className="indented-info">
            <p><span className="label">Status</span>
              {reservation.is_cancelled?
                <span className="flag-red">Cancelled</span>
              : toUnixTimestamp(reservation.line.date_leaving) < unixTimestampNow()?
                <span className="flag-orange">Expired</span>
              : <span className="flag-green">Active</span>}
            </p>

            <p><span className="label">Number of seats</span>{reservation.seats} {reservation.seats > 1? 'Seats' : 'seat'} reserved.</p>
            <p><span className="label">Reference number</span>{reservation.ref_num}</p>
            <p><span className="label">Date reserved</span>{toFormalDateTime(reservation.created_at)}</p>
          </div>
        </section>

        <section>
          <h1 className="section-title">Line information</h1>

          <div className="indented-info">
            <p><span className="label">Source terminal</span>{reservation.line.from_terminal.terminal_name}</p>
            <p><span className="label">Destination</span>{reservation.line.to_terminal.terminal_name}</p>
            <p><span className="label">Date and time of departure</span>{toFormalDateTime(reservation.line.date_leaving)}</p>
            <p><span className="label">Estimated date and time of arrival</span>{toFormalDateTime(reservation.line.date_arriving)}</p>
          </div>
        </section>

        <section>
          {!reservation.request.sending?
            <Link className="more-details" to={'/travel-lines/' + reservation.line.id}>
            More Details
            <span className="decor" />
            </Link>
          : null}

          {!reservation.deleted && !reservation.is_cancelled?
            <InputButton
              value="Cancel my reservation"
              sending={reservation.request.sending}
              onClick={() => this.props.cancelReservation(reservation.line.id)}
              disabled={reservation.request.sending} />
          : toUnixTimestamp(reservation.line.date_leaving) > unixTimestampNow()?
            <div>
            <p><span className="label">Number of seats to reserve</span></p>
            <InputNumber
              min={1}
              max={reservation.line.available_seats}
              value={this.props.user.reservations.seats}
              onChange={() => console.log('change')} />
            <p className="flag-orange">You just cancelled your reservation. <a className="link-default">Undo</a></p>
            </div>
          : <p className="flag-red">This transaction has passed.</p>}
        </section>
      </div>
    ));

    return (
      <div className="dashboard">
        <Topbar />

        {this.props.user.reservations.request.sending?
          <div className="loading-content">
            <div className="loading">
              <i className="fa fa-circle-o-notch fa-3x fast-spin"></i>
            </div>
          </div>
        : this.props.user.reservations.data.length?
          <div className="reservations-list-wrapper">
            {reservationsList}
          </div>
        : <p>You haven't made any reservations yet.</p>}

        <Footer />
      </div>
    );
  }
}

export default connect(store => ({
  user: {...store.user}
}), {
  reservationListFetch: userActions.reservationListFetch,
  cancelReservation: userActions.cancelReservation
})(Dashboard);
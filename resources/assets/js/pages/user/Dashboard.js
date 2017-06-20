import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as userActions from '../../actions/userActions';

import settings from '../../_settings';
import { toFormalDateTime } from '../../helpers/DateTime';

import Topbar from '../../containers/Topbar';
import Footer from '../../components/Footer';

class Dashboard extends Component {
  componentWillMount() {
    if(!this.props.user.logged_in) {
      return this.props.router.push('/sign-in');
    }

    if(!this.props.user.reservations.data.length) {
      this.props.reservationListFetch();
    }
  }

  render() {
    console.log(this.props.user.reservations.data);

    let reservationsList = this.props.user.reservations.data.map((reservation, index) => (
      <div className="reservation-wrapper" key={index}>
        {toFormalDateTime(reservation.created_at)}
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
  reservationListFetch: userActions.reservationListFetch
})(Dashboard);
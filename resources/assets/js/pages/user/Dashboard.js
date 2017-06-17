import React, { Component } from 'react';
import { connect } from 'react-redux';

import settings from '../../_settings';

import Topbar from '../../containers/Topbar';
import Footer from '../../components/Footer';

class Dashboard extends Component {
  componentWillMount() {
    if(!this.props.user.logged_in) {
      this.props.router.push('/sign-in');
    }
  }

  render() {
    return (
      <div className="dashboard">
        <Topbar />

        Dashboard

        <Footer />
      </div>
    );
  }
}

export default connect(store => ({
  user: {...store.user}
}), {

})(Dashboard);
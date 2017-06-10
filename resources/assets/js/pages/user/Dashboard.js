import React, { Component } from 'react';
import { connect } from 'react-redux';

import settings from '../../_settings';

import Topbar from '../../containers/Topbar';
import Footer from '../../components/Footer';

class Dashboard extends Component {
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

export default Dashboard;
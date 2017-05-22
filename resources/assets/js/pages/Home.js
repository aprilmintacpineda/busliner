import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import settings from '../_settings';

import Topbar from '../components/Topbar';

class Home extends Component {
  render() {
    return (
      <div>
        <Topbar />

        <div className="welcome-banner">
          <div className="centered">
            <img src={settings.public_path + '/banner-icon.png'} />
            <div className="welcome-text">
              <h1>Bus Liner</h1>
              <h3>Your safety is our priority.</h3>
            </div>
          </div>
        </div>

        <div className="">
        </div>
      </div>
    );
  }
}

export default connect(store => ({

}), {

})(Home);
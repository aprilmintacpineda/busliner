import React, { Component } from 'react';

import Topbar from '../containers/Topbar';
import Footer from '../components/Footer';

class Line extends Component {
  render() {
    console.log(this.props.params);

    return (
      <div className="travel-line">
        <Topbar />

        line

        <Footer />
      </div>
    );
  }
}

export default Line;
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Topbar from '../containers/Topbar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import E404 from '../components/errors/E404';

import settings from '../_settings';
import * as actions from '../actions/lineActions';

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
    console.log(this.props.line.data.photos);

    let images = this.props.line.data.photos.map((photo, index) => (
      <img key={index} src={settings.storage_path + '/' + photo.file_name} />
    ));

    return (
      <div className="travel-line">
        <Topbar />

        <div className="line-wrapper">
          {this.props.line.request.sending?
            <div className="loading-content">
              <div className="loading">
                <i className="fa fa-circle-o-notch fa-3x fast-spin"></i>
              </div>
            </div>
          : this.props.line.request.error == 404?
            <E404 />
          : <div>
              <Carousel
                items={images}
                speed={20} />
            </div>}
        </div>

        <Footer />
      </div>
    );
  }
}

export default connect(store => ({
  line: {...store.line}
}), {
  fetchData: actions.fetchData,
  clearData: actions.clearData
})(Line);
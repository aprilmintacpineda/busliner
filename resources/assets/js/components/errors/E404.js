import React, { Component } from 'react';

import settings from '../../_settings';

class E404 extends Component {
  render() {
    return (
      <div class="error-body-wrapper">
        <div class="error-body">
          <img src={settings.public_path + '/vader404.jpg'} />

          <h1>Page not found</h1>

          <p>The link you followed may be broken or the page may have been removed.</p>
          <p><a class="button-default button-green" href="{{ url('/') }}">Take me to the homepage.</a></p>
        </div>
      </div>
    );
  }
}

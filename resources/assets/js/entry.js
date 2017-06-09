import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Route, Router } from 'react-router';
import { Provider } from 'react-redux';
import axios from 'axios';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import store from './createStore';
import settings from './_settings';

axios.interceptors.request.use((config) => {
  config.url = settings.public_path + config.url;
  return config;
});

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
    </Router>
  </Provider>,
  document.querySelector('#main')
);
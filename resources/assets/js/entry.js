import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Route, Router } from 'react-router';
import { Provider } from 'react-redux';
import axios from 'axios';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Lines from './pages/Lines';
import Line from './pages/Line';
// user
import UserDashboard from './pages/user/UserDashboard';
import UserSettings from './pages/user/UserSettings';

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
      
      <Route path="/travel-lines" component={Lines} />
      <Route path="/travel-lines/:id" component={Line} />

      <Route path="/user/:id" component={UserDashboard} />
      <Route path="/user/:id/settings/:section" component={UserSettings} />
    </Router>
  </Provider>,
  document.querySelector('#main')
);
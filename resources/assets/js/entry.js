import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Route, Router } from 'react-router';
import { Provider } from 'react-redux';

import Home from './pages/Home';
import SignUp from './pages/SignUp';

import store from './createStore';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/sign-up" component={SignUp} />
    </Router>
  </Provider>,
  document.querySelector('#main')
);
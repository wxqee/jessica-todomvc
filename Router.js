import React from 'react';
import {
  Router,
  Route,
  hashHistory
} from 'react-router';
import App from './components/Main';

export default class AppRouter extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={App} />
        <Route path='/active' component={App} />
        <Route path='/completed' component={App} />
      </Router>
    );
  }
}

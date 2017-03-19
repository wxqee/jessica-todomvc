import React from 'react';
import {
  Router,
  Route,
  hashHistory
} from 'react-router';
import TodoApp from './components/todoApp';

export default class AppRouter extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={TodoApp} />
        <Route path='/active' component={TodoApp} />
        <Route path='/completed' component={TodoApp} />
      </Router>
    );
  }
}

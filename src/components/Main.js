require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import AltContainer from 'alt-container';

import TodoMVC from './TodoMVC.js';
import TodoStore from '../stores/TodoStore.js';

// let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <AltContainer store={TodoStore}>
        <TodoMVC />
      </AltContainer>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

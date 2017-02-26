require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import TodoMVC from './TodoMVC.js';

// let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <TodoMVC />
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

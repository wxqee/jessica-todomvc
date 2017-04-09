require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import AltContainer from 'alt-container';
import TaskStore from '../stores/task-store.jsx'; 
import Body from './Body.jsx';

window.TaskStore = TaskStore;

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
}

  render() {
    return(
      <AltContainer store={TaskStore}>
        <Body/>
      </AltContainer>
      )
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
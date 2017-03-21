require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {Link} from 'react-router';
import TodoItem from './todoItem.js';
import {Input} from './todoComponents.js';

/*eslint-disable no-console, no-unused-vars*/
class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  renderHeader() {
    return (
      <header className="header">
        <h1>todos</h1>
        <Input />
      </header>
    );
  }

  renderMain() {
    return(
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        {/*<label for="toggle-all">Mark all as complete</label>*/}
        <ul className="todo-list">
          {
            this.props.todos.map(todo => <TodoItem key={todo.id} todo={todo} />)
          }
        </ul>
      </section>
    );
  }

  renderFooter() {
    return (
      <footer className="footer">
        {/*This should be `0 items left` by default*/}
        <span className="todo-count"><strong>0</strong> item left</span>
        {/*Remove this if you don't implement routing*/}
        <ul className="filters">
          <li>
            <Link to="/" activeClassName="selected">All</Link>
          </li>
          <li>
            <Link to="/active" activeClassName="selected">Active</Link>
          </li>
          <li>
            <Link to="/completed" activeClassName="selected">Completed</Link>
          </li>
        </ul>
        {/*Hidden if no completed items are left ↓*/}
        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }

  render() {
    return (
      <div>
        <section className="todoapp">
          {this.renderHeader()}
         
          {this.renderMain()}

          {this.renderFooter()}
        </section>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

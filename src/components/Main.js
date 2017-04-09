require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {Link} from 'react-router';
import TodoItem from './todoItem.js';
import {Input, ClearButton, MarkAllAsCompleted} from './todoComponents.js';
import {isCompletedMode, isActiveMode} from './todoUtil.js';

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
    const list = isCompletedMode() && this.props.completedTodos || isActiveMode() && this.props.activeTodos || this.props.todos;

    if(this.props.todos.length <= 0) {
      return null;
    }

    return(
      <section className="main">
        <MarkAllAsCompleted {...this.props} />

        <ul className="todo-list">
          {
            list.map(todo => <TodoItem key={todo.id} todo={todo} />)
          }
        </ul>
      </section>
    );
  }

  renderFooter() {
    if(this.props.todos.length <= 0) {
      return null;
    }

    return (
      <footer className="footer">

        <span className="todo-count"><strong>{this.props.activeTodos.length}</strong> item left</span>
        
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

        <ClearButton />
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

AppComponent.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    completed: React.PropTypes.bool
  }))
};

AppComponent.defaultProps = {
  todos: []
};

export default AppComponent;

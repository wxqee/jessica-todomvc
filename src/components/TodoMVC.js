import React from 'react';
import {Link} from 'react-router';

import NewTodo from './NewTodo.js';
import TodoItem from './TodoItem.js';

import TodoActions from '../actions/TodoActions.js';

import {
  isActiveMode,
  isCompletedMode
} from '../utils/TodoUtil.js';

class ListOfTodos extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const list = isActiveMode() && this.props.todosActive ||
        isCompletedMode() && this.props.todosCompleted ||
        this.props.todos;

    return (
      <ul className="todo-list">
        {/*These are here just to show the structure of the list items*/}
        {/*List items should get the class `editing` when editing and `completed` when marked as completed*/}
        {list.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </ul>
    );
  }
}

export default class TodoMVC extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMain() {
    if (this.props.todos.length == 0) {
      return null;
    }

    return (
      <section className="main">
        <input
          ref="toggleAll"
          className="toggle-all"
          type="checkbox"
          checked={this.props.todosActive.length == 0}
          onChange={e => TodoActions.toggleAll(e.target.checked)} />
        {/*<label for="toggle-all">Mark all as complete</label>*/}
        <ListOfTodos {...this.props} />
      </section>
    );
  }

  renderFooter() {
    if (this.props.todos.length == 0) {
      return null;
    }

    return (
      <footer className="footer">
        {/*This should be `0 items left` by default*/}
        <span className="todo-count"><strong>{this.props.todosActive.length}</strong> item left</span>
        {/*Remove this if you don't implement routing*/}
        <ul className="filters">
          <li>
            <Link activeClassName="selected" to="/">All</Link>
          </li>
          <li>
            <Link activeClassName="selected" to="/active">Active</Link>
          </li>
          <li>
            <Link activeClassName="selected" to="/completed">Completed</Link>
          </li>
        </ul>
        {/*Hidden if no completed items are left ↓*/}
        {this.props.todosCompleted.length > 0 ? (
          <button className="clear-completed" onClick={TodoActions.clearAllCompleted}>Clear completed</button>
        ) : null}
      </footer>
    );
  }

  render() {
    return (
      <div>
        <section className="todoapp">
          <NewTodo />

          {/*This section should be hidden by default and shown when there are todos*/}
          {this.renderMain()}

          {/*This footer should hidden by default and shown when there are todos*/}
          {this.renderFooter()}
        </section>
        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
      </div>
    );
  }
}

TodoMVC.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    completed: React.PropTypes.bool
  }))
};

TodoMVC.defaultProps = {
  todos: []
};

import React from 'react';
import {Link} from 'react-router';

import NewTodo from './NewTodo.js';
import TodoItem from './TodoItem.js';

import TodoActions from '../actions/TodoActions.js';

import {
  isActiveMode,
  isCompletedMode
} from '../utils/TodoUtil.js';

export default class TodoMVC extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMain() {
    if (this.props.todos.length == 0) {
      return null;
    }

    let isToggleAllChecked = this.props.todos.filter(i=>!i.completed).length == 0;
    let toggleAll = (e) => TodoActions.toggleAll(e.target.checked);
    let todos = this.props.todos;

    if (isActiveMode()) {
      todos = todos.filter(it => !it.completed);
    } else if (isCompletedMode()) {
      todos = todos.filter(it => it.completed);
    }

    return (
      <section className="main">
        <input ref="toggleAll" className="toggle-all" type="checkbox" checked={isToggleAllChecked} onChange={toggleAll} />
        {/*<label for="toggle-all">Mark all as complete</label>*/}
        <ul className="todo-list">
          {/*These are here just to show the structure of the list items*/}
          {/*List items should get the class `editing` when editing and `completed` when marked as completed*/}
          {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </ul>
      </section>
    );
  }

  renderFooter() {
    if (this.props.todos.length == 0) {
      return null;
    }

    let countOfItemLeft = this.props.todos.filter(todo => !todo.completed).length;
    let isHasCompleted = this.props.todos.findIndex(todo => todo.completed) >= 0;

    return (
      <footer className="footer">
        {/*This should be `0 items left` by default*/}
        <span className="todo-count"><strong>{countOfItemLeft}</strong> item left</span>
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
        {isHasCompleted ? null : (
          <button className="clear-completed" onClick={TodoActions.clearAllCompleted}>Clear completed</button>
        )}
      </footer>
    );
  }

  render() {
    return (
      <div>
        <section className="todoapp">
          {<NewTodo />}

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

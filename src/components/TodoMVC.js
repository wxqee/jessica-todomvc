import React from 'react';

import NewTodo from './NewTodo.js';
import TodoItem from './TodoItem.js';

import TodoActions from '../actions/TodoAction.js';

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

    return (
      <section className="main">
        <input ref="toggleAll" className="toggle-all" type="checkbox" checked={isToggleAllChecked} onChange={toggleAll} />
        {/*<label for="toggle-all">Mark all as complete</label>*/}
        <ul className="todo-list">
          {/*These are here just to show the structure of the list items*/}
          {/*List items should get the class `editing` when editing and `completed` when marked as completed*/}
          {this.props.todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </ul>
      </section>
    );
  }

  renderFooter() {
    if (this.props.todos.length == 0) {
      return null;
    }

    let countOfItemLeft = this.props.todos.filter(todo => !todo.completed).length;

    return (
      <footer className="footer">
        {/*This should be `0 items left` by default*/}
        <span className="todo-count"><strong>{countOfItemLeft}</strong> item left</span>
        {/*Remove this if you don't implement routing*/}
        <ul className="filters">
          <li>
            <a className="selected" href="#/">All</a>
          </li>
          <li>
            <a href="#/active">Active</a>
          </li>
          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>
        {/*Hidden if no completed items are left ↓*/}
        <button className="clear-completed" onClick={TodoActions.clearAllCompleted}>Clear completed</button>
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

import React from 'react';

export default class TodoMVC extends React.Component {
  renderMain() {
    if (this.props.todos.length == 0) {
      return null;
    }

    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        {/*<label for="toggle-all">Mark all as complete</label>*/}
        <ul className="todo-list">
          {/*These are here just to show the structure of the list items*/}
          {/*List items should get the class `editing` when editing and `completed` when marked as completed*/}
          <li className="completed">
            <div className="view">
              <input className="toggle" type="checkbox" checked />
              <label>Taste JavaScript</label>
              <button className="destroy" />
            </div>
            <input className="edit" value="Create a TodoMVC template" />
          </li>
          <li>
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>Buy a unicorn</label>
              <button className="destroy" />
            </div>
            <input className="edit" value="Rule the web" />
          </li>
        </ul>
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
        <span className="todo-count"><strong>0</strong> item left</span>
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
        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }

  render() {
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input className="new-todo" placeholder="What needs to be done?" autoFocus />
          </header>

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

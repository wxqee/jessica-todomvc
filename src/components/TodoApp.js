import React from 'react';
// import ReactDOM from 'react-dom';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.editInput = null;
  }

  render() {
    return (
      <li className={this.state.editing ? "editing" : (this.props.completed ? "completed" : "view")}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onChange={(e) => this.props.onEdit({completed: e.target.checked})}
          />
          <label
            onDoubleClick={() => {
              this.setState({editing: true}, () => this.editInput.focus());
            }}
          >{this.props.text}</label>
          <button className="destroy" onClick={this.props.onRemove} />
        </div>
        <Input
          ref={i => this.editInput = i}
          className="edit"
          value={this.props.text}
          onValueChange={(text) => {
            this.props.onEdit({text});
            this.setState({editing: false});
          }}
          onBlur={() => this.setState({editing: false})}
        />
      </li>
    );
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.input = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && this.state.value != nextProps.value) {
      this.setState({value: nextProps.value});
    }
  }

  focus() {
    this.input.focus();
  }

  render() {
    let defaultFunc = () => {};

    let {
      value,
      ref,
      onValueChange = defaultFunc,
      onChange = defaultFunc,
      onKeyPress = defaultFunc,
      ...props
    } = this.props;

    return (
      <input
        {...props}
        ref={i => this.input = i}
        value={this.state.value}
        onChange={e => {
          this.setState({value: e.target.value});
          onChange(e);
        }}
        onKeyPress={e => {
          if (e.charCode == 13) {
            onValueChange(this.state.value);
            this.setState({value: ''});
          }
          onKeyPress(e);
        }}
      />
    );
  }
}

class TodoApp extends React.Component {
  renderHeader() {
    return (
      <header className="header">
        <h1>todos</h1>
        <Input
          className="new-todo"
          placeholder="What needs to be done?"
          onValueChange={this.props.onAddTodo}
          autoFocus />
      </header>
    );
  }

  renderTodoListMain() {
    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        {/*<label for="toggle-all">Mark all as complete</label>*/}
        <ul className="todo-list">
          {/*These are here just to show the structure of the list items*/}
          {/*List items should get the class `editing` when editing and `completed` when marked as completed*/}
          {this.props.todos.map(todo =>
            <Todo
              key={todo.id}
              {...todo}
              onEdit={(changes) => this.props.onEditTodo(todo.id, Object.assign({}, todo, {...changes}))}
              onRemove={() => this.props.onRemoveTodo(todo.id)}
            />
          )}
        </ul>
      </section>
    );
  }

  renderTodoListFooter() {
    return (
      <footer className="footer">
        {/*This should be `0 items left` by default*/}
        <span className="todo-count"><strong>{this.props.todos.filter(i => !i.completed).length}</strong> item left</span>
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

  renderFooter() {
    return (
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    );
  }

  render() {
    return (
      <div>
        <section className="todoapp">
          {this.renderHeader()}

          {/*This section should be hidden by default and shown when there are todos*/}
          {this.renderTodoListMain()}

          {/*This footer should hidden by default and shown when there are todos*/}
          {this.renderTodoListFooter()}
        </section>

        {this.renderFooter()}
      </div>
    );
  }
}

TodoApp.propsType = {
};

TodoApp.defaultProps = {
};

export default TodoApp;

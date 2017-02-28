import React from 'react';
import TodoActions from '../actions/TodoActions.js';

const ENTER_KEY = 13;

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.newTitle = '';
  }

  toggle(todo) {
    TodoActions.toggle(todo);
  }

  delete(id) {
    TodoActions.deleteTodo(id);
  }

  toggleEditMode(isEditingMode) {
    let editing = typeof isEditingMode === 'boolean' ? isEditingMode : !this.state.editing;

    this.setState({editing}, () => this.refs.newTitle.focus());
  }

  handleNewTitleKeyDown(e) {
    if (e.keyCode !== ENTER_KEY || this.newTitle == this.props.title) {
      return;
    }

    e.preventDefault();

    let id = this.props.todo.id;
    let newTitle = this.newTitle.trim();

    if (newTitle) {
      TodoActions.editTodo({id, newTitle});
    } else {
      TodoActions.deleteTodo(id);
    }
    this.setState({editing: false});
  }

  handleNewTitleChange(e) {
    e.preventDefault();

    this.newTitle = e.target.value;
  }

  render() {
    let {todo} = this.props;
    let {id, title, completed} = todo;
    let className = this.state.editing ? 'editing' : (
      completed ? 'completed' : ''
    );

    return (
      <li className={className}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={this.toggle.bind(this, todo)} />
          <label onDoubleClick={this.toggleEditMode.bind(this)}>{title}</label>
          <button className="destroy" onClick={this.delete.bind(this, id)}/>
        </div>
        <input
          ref="newTitle"
          className="edit"
          defaultValue={title}
          onKeyDown={this.handleNewTitleKeyDown.bind(this)}
          onChange={this.handleNewTitleChange.bind(this)}
          onBlur={this.toggleEditMode.bind(this, false)} />
      </li>
    );
  }
}

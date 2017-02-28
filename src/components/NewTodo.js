import React from 'react';
import TodoActions from '../actions/TodoActions.js';

const ENTER_KEY = 13;

const NewTodo = () => {
  let newTodo = '';

  const handleNewTodoKeyDown = (e) => {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }

    e.preventDefault();

    let title = newTodo.trim();

    if (title) {
      TodoActions.addTodo(title);
      e.target.value = '';
      newTodo = '';
    }
  }

  const handleNewTodoChange = (e) => {
    e.preventDefault();
    newTodo = e.target.value;
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={handleNewTodoKeyDown}
        onChange={handleNewTodoChange}
        autoFocus />
    </header>
  );
};

export default NewTodo;

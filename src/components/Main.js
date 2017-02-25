require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import TodoApp from './TodoApp.js';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {id: 1, text: 'create app', completed: true},
        {id: 2, text: 'new todo item should support'},
        {id: 3, text: 'do not repeat it.'}
      ]
    };

    this.nextId = 4;
  }

  genId() {
    return this.nextId++;
  }

  handleEditTodo(id, newTodo) {
    let {todos} = this.state;

    let todo = todos.find(i => i.id == id);
    Object.assign(todo, newTodo);

    this.setState({todos});
  }

  handleAddTodo(text) {
    let {todos} = this.state;

    text = text.trim();

    todos.push(Object.assign({}, {text}, {id: this.genId()}));

    this.setState({todos});
  }

  handleRemoveTodo(id) {
    let {todos} = this.state;

    todos.splice(todos.findIndex(i => i.id == id), 1);

    this.setState({todos});
  }

  handleChangeTodos(newTodos) {
    let {todos} = this.state;

    todos = newTodos;

    this.setState({todos});
  }

  render() {
    return (
      <TodoApp
        todos={this.state.todos}
        onRemoveTodo={this.handleRemoveTodo.bind(this)}
        onAddTodo={this.handleAddTodo.bind(this)}
        onEditTodo={this.handleEditTodo.bind(this)}
        onChangeTodos={this.handleChangeTodos.bind(this)}
      />);
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

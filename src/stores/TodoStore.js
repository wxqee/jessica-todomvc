import alt from '../alt.js';

import TodoActions from '../actions/TodoAction.js';

const uuid = () => {
	/*jshint bitwise:false */
	var i, random;
	var uuid = '';

	for (i = 0; i < 32; i++) {
		random = Math.random() * 16 | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			uuid += '-';
		}
		uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
			.toString(16);
	}

	return uuid;
};


class TodoStore {
  constructor() {
    this.todos = [];

    this.bindListeners({
      handleAddTodo: TodoActions.ADD_TODO,
      handleEditTodo: TodoActions.EDIT_TODO,
      handleDeleteTodo: TodoActions.DELETE_TODO,
      handleToggle: TodoActions.TOGGLE
    });
  }

  handleAddTodo(title) {
    let newTodo = this.createTodo(title);

    // TODO .. to change localStorage as DataSource
    this.todos.push(newTodo);
  }

  handleEditTodo({id, newTitle}) {
    this.todos = this.todos.map(it => {
      return it.id !== id ? it : Object.assign({}, it, {title: newTitle});
    });
  }

  handleDeleteTodo(id) {
    let newTodos = [];

    this.todos.forEach(todo => {
      if (todo.id === id) {
        return;
      }

      newTodos.push(todo);
    });

    // TODO .. newTodos may affect performance issure or logic issue, because
    // new copy of todos happends.
    this.todos = newTodos;
  }

  handleToggle(todo) {
    this.todos = this.todos.map(it => {
      return it !== todo ? it : Object.assign({}, it, {completed: !it.completed});
    });
  }

  createTodo(title) {
    return {
      id: uuid(),
      title: title,
      completed: false
    }
  }
}

export default alt.createStore(TodoStore, 'TodoStore');

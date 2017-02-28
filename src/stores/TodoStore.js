import alt from '../alt.js';

import TodoActions from '../actions/TodoActions.js';
import {
	uuid,
	store
} from '../utils/TodoUtil.js';

import {
	APP_NAME
} from '../utils/Contants.js';

class TodoStore {
  constructor() {
    this.todos = store(APP_NAME) || [];

    this.bindListeners({
      handleAddTodo: TodoActions.ADD_TODO,
      handleEditTodo: TodoActions.EDIT_TODO,
      handleDeleteTodo: TodoActions.DELETE_TODO,
      handleToggle: TodoActions.TOGGLE,
			handleToggleAll: TodoActions.TOGGLE_ALL,
      handleClearAllCompleted: TodoActions.CLEAR_ALL_COMPLETED
    });
  }

  handleAddTodo(title) {
		let newTodo = this.createTodo(title);
    this.todos.unshift(newTodo);

		store(APP_NAME, this.todos);
  }

  handleEditTodo({id, newTitle}) {
    this.todos = this.todos.map(it => {
      return it.id !== id ? it : Object.assign({}, it, {title: newTitle});
    });

		store(APP_NAME, this.todos);
  }

  handleDeleteTodo(id) {
    let newTodos = [];

    this.todos.forEach(todo => {
      if (todo.id === id) {
        return;
      }

      newTodos.push(todo);
    });

    this.todos = newTodos;

		store(APP_NAME, this.todos);
  }

  handleToggle(todo) {
    this.todos = this.todos.map(it => {
      return it !== todo ? it : Object.assign({}, it, {completed: !it.completed});
    });

		store(APP_NAME, this.todos);
  }

	handleToggleAll(checked) {
		this.todos.forEach(it => it.completed = checked);

		store(APP_NAME, this.todos);
	}

	handleClearAllCompleted() {
		this.todos = this.todos.filter(it => !it.completed);

		store(APP_NAME, this.todos);
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

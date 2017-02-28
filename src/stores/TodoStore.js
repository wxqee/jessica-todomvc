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
		this.initAfterTodosUpdate();

    this.bindListeners({
      handleAddTodo: TodoActions.ADD_TODO,
      handleEditTodo: TodoActions.EDIT_TODO,
      handleDeleteTodo: TodoActions.DELETE_TODO,
      handleToggle: TodoActions.TOGGLE,
			handleToggleAll: TodoActions.TOGGLE_ALL,
      handleClearAllCompleted: TodoActions.CLEAR_ALL_COMPLETED
    });

		// this.on('afterEach', this.initAfterTodosUpdate.bind(this));
  }

	initAfterTodosUpdate() {
		this.todosCompleted = this.todos.filter(i => i.completed);
		this.todosActive = this.todos.filter(i => !i.completed);
	}

  handleAddTodo(title) {
		let newTodo = this.createTodo(title);
    this.todos.push(newTodo);

		this.initAfterTodosUpdate();
		store(APP_NAME, this.todos);
  }

  handleEditTodo({id, newTitle}) {
    this.todos = this.todos.map(it => {
      return it.id !== id ? it : Object.assign({}, it, {title: newTitle});
    });

		this.initAfterTodosUpdate();
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

		this.initAfterTodosUpdate();
		store(APP_NAME, this.todos);
  }

  handleToggle(todo) {
    this.todos = this.todos.map(it => {
      return it !== todo ? it : Object.assign({}, it, {completed: !it.completed});
    });

		this.initAfterTodosUpdate();
		store(APP_NAME, this.todos);
  }

	handleToggleAll(checked) {
		this.todos.forEach(it => it.completed = checked);

		this.initAfterTodosUpdate();
		store(APP_NAME, this.todos);
	}

	handleClearAllCompleted() {
		this.todos = this.todos.filter(it => !it.completed);

		this.initAfterTodosUpdate();
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

import alt from '../alt.js';
import TodoActions from '../actions/todoActions.js';
import {uuid, store} from '../utils/todoUtil.js';

const APP_NAME = 'todos_APP';

class TodoStore {
	constructor() {
		this.todos = store(APP_NAME) || [];
		this.initTodos();

		this.bindListeners({
			handleNewTodo: TodoActions.NEW_TODO,
			handleToggleTodo: TodoActions.TOGGLE_TODO,
			handleEditTodo: TodoActions.EDIT_TODO,
			handleDeleteTodo: TodoActions.DELETE_TODO,
			handleClearCompletedTodos: TodoActions.CLEAR_COMPLETED_TODOS,
			handleToggleAllCompleted: TodoActions.TOGGLE_ALL_COMPLETED
		});
	}

	initTodos() {
		this.completedTodos = this.todos.filter(i => i.completed == true);
		this.activeTodos = this.todos.filter(i => i.completed == false);
	}

	createTodo(title) {
		return (
			{
				id: uuid(),
				title: title,
				completed: false
			}
		);
	}

	handleNewTodo(title) {
		this.todos.push(this.createTodo(title));
		this.initTodos();
		store(APP_NAME, this.todos);
	}

	handleToggleTodo(id) {
		this.todos.filter(i => {
			if(i.id === id) {
				i.completed = !i.completed;
				this.initTodos();
				store(APP_NAME, this.todos);
			}
		});
	}

	handleEditTodo({id, newTitle}) {
		this.todos.filter(i => {
			if(i.id === id) {
				i.title = newTitle;
				this.initTodos();
				store(APP_NAME, this.todos);
			}
		});
	}

	handleDeleteTodo(id) {
		let index = 0;
		for(let i=0; i<this.todos.length; i++) {
			if(this.todos[i].id === id) {
				index = i;
			}
		}
		this.todos.splice(index, 1);

		this.initTodos();
		store(APP_NAME, this.todos);
	}

	handleClearCompletedTodos() {
		this.todos.forEach(i => i.completed = false);

		this.initTodos();
		store(APP_NAME, this.todos);
	}

	handleToggleAllCompleted(isCompleted) {
		this.todos.forEach(i => i.completed = isCompleted);

		this.initTodos();
		store(APP_NAME, this.todos);
	}
}

export default alt.createStore(TodoStore, 'TodoStore');
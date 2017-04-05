import alt from '../alt.js';
import TodoActions from '../actions/todoActions.js';
import {uuid, store} from '../components/todoUtil.js';

class TodoStore {
	constructor() {
		this.todos = [];
		this.initTodos();

		this.bindListeners({
			handleNewTodo: TodoActions.newTodo
		});
	}

	initTodos() {
		this.completedTodos = this.todos.filter(i => i.completed == true);
		this.activeTodos = this.todos.filter(i => i.completed == false);
		debugger;
	}

	handleNewTodo(title) {
		this.todos.push(this.createTodo(title));
		this.initTodos();
		store(this.todos);
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
}

export default alt.createStore(TodoStore, 'TodoStore');
import alt from '../alt.js';
import TodoActions from '../actions/todoActions.js';

class TodoStore {
	constructor() {
		this.todos = [];

		this.bindListeners({
			handleAddTodo: TodoActions.addTodo
		});
	}

	handleAddTodo() {

	}
}

export default alt.createStore(TodoStore, 'TodoStore');
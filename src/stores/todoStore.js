import alt from '../alt.js';
import TodoActions from '../actions/todoActions.js';
import {uuid} from '../components/todoUtil.js';

class TodoStore {
	constructor() {
		this.todos = [];

		this.bindListeners({
			handleNewTodo: TodoActions.newTodo
		});
	}

	handleNewTodo() {
		
	}
}

export default alt.createStore(TodoStore, 'TodoStore');
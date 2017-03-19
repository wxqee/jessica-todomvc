import alt from '../../alt.js';
import todoActions from '../actions/todoActions.js';

class todoStore {
	constructor() {
		this.bindListeners({
			handleAddTodo: todoActions.addTodo
		});
	}


}

module.exports = alt.createrStore(todoStore, 'todoStore');
import alt from '../../alt.js';

class todoStore {
	constructor() {
		this.bindListeners({});
	}


}

module.exports = alt.createrStore(todoStore, 'todoStore');
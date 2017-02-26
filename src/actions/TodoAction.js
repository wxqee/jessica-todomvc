import alt from '../alt.js';

class TodoActions {
  addTodo(title) {
    /* It is not work now, is that becuase no DataSource defined??? */
    // this.dispatch(title);
    return title;
  }
}

export default alt.createActions(TodoActions);

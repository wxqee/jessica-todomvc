import alt from '../alt.js';

class TodoActions {
  addTodo(title) {
    /* It is not work now, is that becuase no DataSource defined??? */
    // this.dispatch(title);
    return title;
  }

  toggle(todo) {
    return todo;
  }

  editTodo({id, newTitle}) {
    return {id, newTitle};
  }

  deleteTodo(id) {
    return id;
  }
}

export default alt.createActions(TodoActions);

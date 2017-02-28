import alt from '../alt.js';

const TodoActions = alt.generateActions(
  'addTodo',
  'toggle',
  'toggleAll',
  'editTodo',
  'deleteTodo',
  'clearAllCompleted'
);

export default TodoActions;

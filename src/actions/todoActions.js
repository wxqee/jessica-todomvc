import alt from '../alt.js';

const TodoActions = alt.generateActions(
	'newTodo',
	'toggleTodo',
	'editTodo',
	'deleteTodo',
	'clearCompletedTodos',
	'toggleAllCompleted'
);

export default TodoActions;
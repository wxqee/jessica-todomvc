import React from 'react';
import TodoActions from '../actions/todoActions.js';

const ENTER_KEY = 13;

export class Input extends React.Component {
	handleEnter(e) {
		let title = this.inputRef.value.trim();
		if(e.keyCode === ENTER_KEY && title.length > 0) {
			TodoActions.newTodo(title);
			this.inputRef.value = '';
		}
	}

	render() {
		return (
			<input
				ref={ref => this.inputRef = ref}
				className="new-todo"
				placeholder="What needs to be done?"
				onKeyDown={this.handleEnter.bind(this)}
				autoFocus
			/>
		);
	}
}

export class ClearButton extends React.Component {
	clearCompletedTodos() {
		TodoActions.clearCompletedTodos();
	}

	render() {
		return (
			<button
				className="clear-completed"
				onClick={this.clearCompletedTodos.bind(this)}
			>
				Clear completed
			</button>
		);
	}
}

export class MarkAllAsCompleted extends React.Component {
	markAllAsCompleted() {
		if(this.props.completedTodos.length < this.props.todos.length) {
			TodoActions.toggleAllCompleted(true);
		} else {
			TodoActions.toggleAllCompleted(false);
		}
	}

	render() {
		return (
			<input
	          className="toggle-all"
	          type="checkbox"
	          onClick={this.markAllAsCompleted.bind(this)}
	        />
		);
	}
}




import React from 'react';
import TodoActions from './actions/todoActions.js';

const ENTER_KEY = 13;

/*eslint-disable no-console, no-alert*/
export class Input extends React.Component {
	constructor(props) {
		super(props);

		this.handleEnter = this.handleEnter.bind(this);

	}

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
				onKeyDown={this.handleEnter}
				autoFocus
			/>
		);
	}
}

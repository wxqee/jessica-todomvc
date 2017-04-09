import React from 'react';
import TodoActions from '../actions/todoActions.js';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

/*eslint-disable no-console*/
export default class TodoItem extends React.Component {
	constructor(props) {
		super(props);

		this.toggleTodo = this.toggleTodo.bind(this);
		this.doubleClick = this.doubleClick.bind(this);
		this.blur = this.blur.bind(this);
		this.enter = this.enter.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);

		this.state = {
			editing: false
		};
	}

	toggleTodo() {
		TodoActions.toggleTodo(this.props.todo.id);
	}

	doubleClick() {
		this.setState({
			editing: true
		}, () => {
			this.editRef.value = this.props.todo.title;
			this.editRef.focus();
		});
	}

	deleteTodo() {
		debugger;
		TodoActions.deleteTodo(this.props.todo.id);
	}

	blur() {
		let newTitle = this.editRef.value.trim();
		const id = this.props.todo.id;

		if(newTitle.length > 0) {
			TodoActions.editTodo({id, newTitle});
		} else {
			this.deleteTodo(this.props.todo.id);
		}

		this.setState({editing: false});
	}

	enter(e) {
		if(e.keyCode === ENTER_KEY) {
			this.blur();
		} else if (e.keyCode === ESCAPE_KEY) {
			this.setState({editing: false});
			//Is there another way to prevent default blur event?
			this.editRef.value = this.props.todo.title;
		}
	}

	render() {
		let className = [];

		if(this.props.todo.completed) {
			className.push('completed');
		}

		if(this.state.editing) {
			className.push('editing');
		}

		className.join(' ');

		return(
			<li className={className}>
		        <div className="view">
		          <input
		          	className="toggle"
		          	type="checkbox"
		          	checked={this.props.todo.completed}
		          	onChange={() => {}}
		          	onClick={this.toggleTodo}
		          />
		          <label onDoubleClick={this.doubleClick}>
		          	{this.props.todo.title}
		          </label>
		          <button
		          	className="destroy"
		          	onClick={this.deleteTodo}
		          />
		        </div>
		        <input
		        	ref={ref => this.editRef = ref}
		        	className="edit"
		        	onChange={() => {}}
		        	onBlur={this.blur}
		        	onKeyDown={this.enter}
		        />
		    </li>
		);
	}
}
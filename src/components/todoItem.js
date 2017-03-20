import React from 'react';

export default class TodoItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<li className={this.props.todo.completed ? 'completed' : ''}>
		        <div className="view">
		          <input className="toggle" type="checkbox" checked={this.props.todo.completed} />
		          <label>{this.props.todo.title}</label>
		          <button className="destroy" />
		        </div>
		        <input className="edit" value={this.props.todo.title} />
		    </li>
		);
	}
}
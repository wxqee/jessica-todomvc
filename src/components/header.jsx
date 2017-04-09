import React from 'react';
import TaskActions from '../actions/task-actions.jsx';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value:''
		}
	}

	_handleKeyPress(target){
		if(target.charCode != 13){
			return;
		}

		if(this.state.value.trim()){
			TaskActions.addNewTask(this.state.value.trim());
			this.setState({
				value:''
			})
		}
	}

	onChange(evt) {
		this.setState({
			value:evt.target.value
		});
	}

	render() {
		return (
			<header className="header">
        <h1>todos</h1>
        <input className="new-todo"
							 placeholder="What needs to be done?"
							 autoFocus
							 value={this.state.value}
							 onKeyPress={this._handleKeyPress.bind(this)}
							 onChange={this.onChange.bind(this)}/>
      </header>
		)
	}
}

export default Header;
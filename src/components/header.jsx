import React from 'react';

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
			this.props.addNewTask(this.state.value);
			this.refs.newTaskInput.value=null;
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
							 ref="newTaskInput"
							 onKeyPress={this._handleKeyPress.bind(this)}
							 onChange={this.onChange.bind(this)}/>
      </header>
		)
	}
}

export default Header;
import React from 'react';
import TaskActions from '../actions/task-actions.jsx';

class Task extends React.Component{
	constructor(props){
		super(props);

		this.state={
			taskName:this.props.taskInfo.taskName
		}
	}

	complete(){ 
		TaskActions.complete(this.props.numberTag);
	}

	handleDoubleClick(evt){
		/*add the editing class name*/
		let editInput = evt.target.parentNode.nextSibling;
		evt.target.parentNode.parentNode.className = 'editing';
		if(editInput.autoFocus != true){
			if(editInput.setSelectionRange){
				editInput.focus();
			}
		}

		/*give the text in label to editing input*/
		evt.target.parentNode.nextSibling.value=this.state.taskName;
	}

	handleOnBlur(evt){
		let classNames='';
		evt.target.parentNode.className=classNames;
 
		TaskActions.taskModified([this.props.numberTag, this.state.taskName]);
		this.refs.taskLabel.parentNode.parentNode.className = classNames;
	}

	_handleKeyPress(target){
		if(target.charCode != 13){
			return;
		}

		this.refs.taskLabel.innerHTML=this.state.taskName;
		this.refs.taskLabel.parentNode.parentNode.className = this.refs.taskLabel.parentNode.parentNode.className.replace('editing','').trim();
		TaskActions.taskModified([this.props.numberTag, this.state.taskName]);
	}

	onChange(evt) {
		this.setState({
			taskName:evt.target.value
		});
	}

	removeThisItem(){
		TaskActions.removeItem(this.props.numberTag);
	}

	render(){
		let taskName=this.state.taskName;

		if(taskName.length === 0){
			return null;
		} else {
			return(
				<li className={this.props.taskInfo.complete ? 'completed':''}>
					<div className="view">
						<input className="toggle" type="checkbox" onClick={this.complete.bind(this)} checked={this.props.taskInfo.complete}/>
						<label onDoubleClick={this.handleDoubleClick.bind(this)} ref="taskLabel">{taskName}</label>
						<button className="destroy" onClick={this.removeThisItem.bind(this)} 
						        />
					</div>
					<input className="edit"
								 onBlur={this.handleOnBlur.bind(this)}
								 onKeyPress={this._handleKeyPress.bind(this)}
								 onChange={this.onChange.bind(this)}/>
				</li>
			)
		}
	}
}

export default Task;
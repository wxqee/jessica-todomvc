import React from 'react';

class Task extends React.Component{
	constructor(props){
		super(props);

		this.state={
			taskName:this.props.taskInfo.taskName
		}
	}

	complete(){
		this.props.completeClicked();
	}

	handleDoubleClick(evt){
		/*add the editing class name*/
		let editInput = evt.target.parentNode.nextSibling;
		let editingClassName = evt.target.parentNode.parentNode.className.trim().concat(" editing");
		evt.target.parentNode.parentNode.className = editingClassName;
		if(editInput.autoFocus != true){
			if(editInput.setSelectionRange){
				editInput.focus();
			} else if(editInput.createTextRange){
				let range=editInput.createTextRange();
				range.collapse(true);
			}
		}

		/*give the text in label to editing input*/
		let labelText=this.state.taskName;
		evt.target.parentNode.nextSibling.value=labelText;
	}

	handleOnBlur(evt){
		let classNames=evt.target.parentNode.className.replace('editing','').trim();
		evt.target.parentNode.className=classNames;

		this.props.changeTaskName(this.state.taskName);
		this.refs.taskLabel.parentNode.parentNode.className = classNames;
	}

	_handleKeyPress(target){
		if(target.charCode != 13){
			return;
		}

		this.refs.taskLabel.innerHTML=this.state.taskName;
		let classNames=this.refs.taskLabel.parentNode.parentNode.className.replace('editing','').trim();
		this.refs.taskLabel.parentNode.parentNode.className = classNames;
		this.props.changeTaskName(this.state.taskName);
	}

	onChange(evt) {
		this.setState({
			taskName:evt.target.value
		});
	}

	render(){
		let taskName=this.props.taskInfo.taskName;
		let complete=this.props.taskInfo.complete;
		let taskLiClass;
		let checked;

		if(complete === true){
			taskLiClass = 'completed';
			checked=true;
		} else {
			taskLiClass='';
			checked=false;
		}
		if(taskName.length === 0){
			return null;
		} else {
			return(
				<li className={taskLiClass}>
					<div className="view">
						<input className="toggle" type="checkbox" onClick={this.complete.bind(this)} checked={checked}/>
						<label onDoubleClick={this.handleDoubleClick.bind(this)} ref="taskLabel">{taskName}</label>
						<button className="destroy" onClick={this.props.removeThisItem.bind(this)} />
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
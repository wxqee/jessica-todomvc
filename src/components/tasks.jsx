import React from 'react';
import Task from './task.jsx';

class Tasks extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let taskList = this.props.taskList;
		let taskItems = taskList.map((taskName,i) => <Task taskInfo={taskName}
																											 key={i}
																											 addNewTask={this.props.addNewTask}
																											 removeThisItem={this.props.removeThisItem.bind(this,i)}
																											 changeTaskName={this.props.changeTaskName.bind(this,i)}
																											 completeClicked={this.props.completeClicked.bind(this,i)}/>);
		return(
			<ul className="todo-list" >
				{taskItems}
			</ul>
		)
	}
}

export default Tasks;
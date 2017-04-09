import React from 'react';
import TaskActions from '../actions/task-actions.jsx';

class Footer extends React.Component{
	constructor(){
		super();
	}

	clearCompleted(){
		TaskActions.clearCompleted();
	}

	render(){
		let completeList=this.props.completeList;
		let activeNumber=this.props.taskNumber-completeList;
		let liClass=new Array(3);
		let itemIcon=activeNumber===1?'item':'items';

		liClass[this.props.displayView] = 'selected';

		let clearCompletedIcon=completeList===0 ? null:<button className="clear-completed" onClick={this.clearCompleted}>Clear completed</button>;

		if(this.props.taskNumber === 0){
			return null;
		} else {
			return(
				<footer className="footer">
					<span className="todo-count"><strong>{activeNumber}</strong> {itemIcon} left</span>
					<ul className="filters">
						<li>
							<a href="#/" className={liClass[0]} onClick={this.props.showAll}>All</a>
						</li>
						<li>
							<a href="#/active" onClick={this.props.showActive} className={liClass[1]}>Active</a>
						</li>
						<li>
							<a href="#/completed"  onClick={this.props.showCompleted} className={liClass[2]}>Completed</a>
						</li>
					</ul>
					{clearCompletedIcon}
				</footer>
			)
		}

	}
}

export default Footer;
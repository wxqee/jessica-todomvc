import React from 'react';

class Footer extends React.Component{
	constructor(){
		super();
	}

	render(){
		let taskNumber = this.props.taskNumber;
		let completeList=this.props.completeList;
		let activeNumber=taskNumber-completeList;
		let displayView=this.props.displayView;
		let liClass=['','',''];
		let itemIcon=activeNumber===1?'item':'items';

		for(let i=0;i<displayView.length;i++){
			liClass[i]=displayView[i] === true? "selected":'';
		}

		let clearCompletedIcon=completeList===0 ? null:<button className="clear-completed" onClick={this.props.clearCompleted}>Clear completed</button>;

		if(taskNumber === 0){
			return null;
		} else {
			return(
				<footer className="footer">
					{/*This should be `0 items left` by default*/}
					<span className="todo-count"><strong>{activeNumber}</strong> {itemIcon} left</span>
					{/*Remove this if you don't implement routing*/}
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
					{/*Hidden if no completed items are left ↓*/}
					{clearCompletedIcon}
				</footer>
			)
		}

	}
}

export default Footer;
import React from 'react'; 

class Footernote extends React.Component{
	constructor(){
		super();
	}

	render(){
		return(
			<footer className="info">
				<p>Double-click to edit a todo</p>
				<p>Part of <a href="http://todomvc.com">pathTodoMVC</a></p>
			</footer>
		)
	}
}

export default Footernote;

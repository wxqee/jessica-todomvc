import React from 'react';
import AltContainer from 'alt-container';
import TodoStore from '../stores/todoStore.js';
import AppComponent from './Main.js';

class TodoApp extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<AltContainer store={TodoStore}>
				<AppComponent />
			</AltContainer>
		);
	}
}

TodoApp.defaultProps = {
};

export default TodoApp;
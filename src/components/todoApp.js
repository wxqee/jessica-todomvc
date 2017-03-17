import React from 'react';
import AltContainer from 'alt/AltContainer';
import todoStore from './todoStore.js';
import AppComponent from './Main.js';

class todoApp extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<AltContainer store={todoStore}>
				<AppComponent />
			</AltContainer>
		);
	}
}

todoApp.defaultProps = {
};

export default todoApp;
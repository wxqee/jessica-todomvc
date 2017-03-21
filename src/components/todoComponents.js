import React from 'react';

export class Input extends React.Component {
	render() {
		return (
			<input className="new-todo" placeholder="What needs to be done?" autoFocus />
		);
	}
}

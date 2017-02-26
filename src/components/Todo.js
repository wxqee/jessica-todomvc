import React from 'react';
import Input from './Input.js';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.editInput = null;
  }

  render() {
    return (
      <li className={this.state.editing ? 'editing' : (this.props.completed ? 'completed' : 'view')}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onChange={(e) => this.props.onEdit({completed: e.target.checked})}
          />
          <label
            onDoubleClick={() => {
              this.setState({editing: true}, () => this.editInput.focus());
            }}
          >{this.props.text}</label>
          <button className="destroy" onClick={this.props.onRemove} />
        </div>
        <Input
          ref={i => this.editInput = i}
          className="edit"
          value={this.props.text}
          onValueChange={(text) => {
            this.props.onEdit({text});
            this.setState({editing: false});
          }}
          onBlur={() => this.setState({editing: false})}
        />
      </li>
    );
  }
}

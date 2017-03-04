import React from 'react';

class ToDoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: this.props.item.completed || false
    };
  }

  toogle() {
    this.setState({
      completed: !this.state.completed
    }, () => {
      this.props.onChange(this.state.completed);
    });
  }

  onEdit() {
    alert();
  }

  onDelete() {
    this.props.onDelete(this.props.item.id);
  }

  render() {
    const {item} = this.props;

    let className = '';

    if (this.state.completed) {
      className = 'completed';
    }

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={this.state.completed} onChange={this.toogle.bind(this)}/>
          <label onDoubleClick={this.onEdit.bind(this)}>{item.title}</label>
          <button className="destroy" onClick={this.onDelete.bind(this)} />
        </div>
        <input className="edit" value="Rule the web" />
      </li>
    );
  }
}

ToDoItem.defaultProps = {
};

export default ToDoItem;

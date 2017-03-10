import React from 'react';

const ENTER_KEY = 13;

class ToDoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: this.props.item.completed || false,
      editing: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      completed: nextProps.item.completed
    });
  }

  toogle() {
    let newStatus = !this.state.completed;
    
    this.setState({completed: newStatus});
    this.props.onChange(newStatus);
  }

  onDelete() {
    this.setState({
      completed: false
    });

    this.props.onDelete(this.props.item.id);
  }

  //TODO: think about the structor to find if there are pithy ways
  getEditingValue() {
    let {editing} = this.refs;
    let value = editing.value;

    return value;
  }

  changeHandle() {
    let value = this.getEditingValue();

    this.props.onEdit(value);
  }

  enterToBlur(e) {
    if (e.keyCode == ENTER_KEY) {
      this.blur();
    }
  }

  blur() {
    let value = this.getEditingValue();

    if (!value) {
      this.onDelete();
    }

    this.setState({editing: false});
  }

  render() {
    const {item} = this.props;

    let classNameArray = [];

    if (this.state.completed) {
      classNameArray.push('completed');
    }
    if (this.state.editing) {
      classNameArray.push('editing');
    }

    let className = classNameArray.join(' ');

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={this.state.completed} onChange={this.toogle.bind(this)}/>
          <label onDoubleClick={() => {this.setState({editing: true})}}>{item.title}</label>
          <button className="destroy" onClick={this.onDelete.bind(this)} />
        </div>
        <input
          ref="editing"
          className="edit"
          value={item.title}
          onChange={this.changeHandle.bind(this)}
          onBlur={this.blur.bind(this)}
          onKeyDown={this.enterToBlur.bind(this)} //TODO: see if there is another way
        />
      </li>
    );
  }
}

ToDoItem.defaultProps = {
};

export default ToDoItem;

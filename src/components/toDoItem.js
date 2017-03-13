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

  toogleChecked() {
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

  doubleClick() {
    this.setState({
      editing: true
    }, () => {
      this.refs.editing.focus();
    });
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
          <input className="toggle" type="checkbox" checked={this.state.completed} onChange={this.toogleChecked.bind(this)}/>
          <label onDoubleClick={this.doubleClick.bind(this)}>{item.title}</label>
          <button className="destroy" onClick={this.onDelete.bind(this)} />
        </div>
        <input
          ref="editing"
          className="edit"
          value={item.title}
          onChange={this.changeHandle.bind(this)}
          onBlur={this.blur.bind(this)}
          onKeyDown={this.enterToBlur.bind(this)}
        />
      </li>
    );
  }
}

ToDoItem.propTypes = {
  item: React.PropTypes.shape({
    id: React.PropTypes.number,
    title: React.PropTypes.string,
    completed: React.PropTypes.bool
  }),
  onChange: React.PropTypes.func,
  onDelete: React.PropTypes.func,
  onEdit: React.PropTypes.func
};

export default ToDoItem;

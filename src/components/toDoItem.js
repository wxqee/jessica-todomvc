import React from 'react';

class ToDoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item} = this.props;
    let className = '';

    if (item.completed) {
      className = 'completed';
    }

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={item.completed}/>
          <label>{item.title}</label>
          <button className="destroy" />
        </div>
        <input className="edit" value="Rule the web" />
      </li>
    );
  }

}

ToDoItem.defaultProps = {
};

export default ToDoItem;
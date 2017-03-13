require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ToDoItem from './toDoItem.js'

const ENTER_KEY = 13;

const FILTER_TYPES = {
  ALL: 1,
  ACTIVE: 2,
  COMPLETED: 3
};

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.data = [{
        id: 1,
        title: 'Taste JavaScript',
        completed: true
      },
      {
        id: 2,
        title: 'Buy a unicorn',
        completed: false
      }
    ];
    this.nextId = 3;
    this.completed = true;

    this.state = {
      isDataChange: false,
      activeModel: 1,
      todos: this.data
    };
  }

  newTodo(e) {
    if (e.keyCode == ENTER_KEY) {
      let {inputForNewToDo} = this.refs;

      let toDoLabel = inputForNewToDo.value.trim();

      if (toDoLabel.length > 0) {
        this.data.push({
          title: toDoLabel,
          completed: false,
          id: this.nextId++
        });

        this.setState({
          isDataChange: true
        }, () => {
          inputForNewToDo.value = null;
        });
      }
    }
  }

  renderHeader() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          ref="inputForNewToDo"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onKeyDown={this.newTodo.bind(this)}
        />
      </header>
    );
  }

  toDoDel(id) {
    let aimIndex = this.data.findIndex(i => i.id === id);
    this.data.splice(aimIndex, 1);

    this.setState({
      isDataChange: true,
      todos: this.getTodos(this.state.activeModel)
    });
  }

  toDoEdit(id, value) {
    // let currentToDo = this.data.filter(i => i.id === id);
    // currentToDo.title = value;
    this.data.map((item) => {
      if(item.id === id) {
        item.title = value;
        return;
      }
    });

    this.setState({
      isDataChange: true
    });
  }

  toDoStatusChange(id, status) {
    let index = this.data.findIndex(i => i.id === id);

    this.data[index].completed = status;

    this.setState({
      isDataChange: true
    });
  }

  getDisplayStyle() {
    let dataLength = this.data.length;
    let display = 'block';

    if(dataLength <= 0) {
      display = 'none';
    }

    return display;
  }

  toogleAll() {
    this.data.map(i => {i.completed = this.completed});
    this.completed = !this.completed;

    this.setState({
      isDataChange: true,
      todos: this.getTodos(this.state.activeModel)
    });
  }

  renderMain() {
    return (
      <section className="main" style={{display: this.getDisplayStyle()}}>
        <input className="toggle-all" type="checkbox" onClick={this.toogleAll.bind(this)}/>
        {/*<label for="toggle-all">Mark all as complete</label>*/}
        <ul className="todo-list">
          {
            this.state.todos.map((item, key) => {
              return (
                <ToDoItem
                  item={item}
                  key={key}
                  onChange={this.toDoStatusChange.bind(this, item.id)}
                  onDelete={this.toDoDel.bind(this)}
                  onEdit={this.toDoEdit.bind(this, item.id)}
                />
              );
            })
          }
        </ul>
      </section>
    );
  }

  clearCompleted() {
    this.data.map(i => {i.completed = false});

    this.setState({
      isDataChange: true,
      todos: this.getTodos(this.state.activeModel)
    });
  }

  getTodos(key) {
    let todos = null;
    switch(key) {
      case FILTER_TYPES.ALL:
        todos = this.data;
        break;
      case FILTER_TYPES.ACTIVE:
        todos = this.data.filter(i => i.completed == false);
        break;
      case FILTER_TYPES.COMPLETED:
        todos = this.data.filter(i => i.completed == true);
        break;
      default:
        break;
    }

    return todos;
  }

  filter(key) {
    this.setState({
      todos: this.getTodos(key),
      activeModel: key
    });
  }

  renderFooter() {
    let clearButton = null;

    if(this.data.filter(i => i.completed === true).length > 0) {
      clearButton = (
        <button className="clear-completed" onClick={this.clearCompleted.bind(this)}>Clear completed</button>
      );
    }

    return (
      <footer className="footer" style={{display: this.getDisplayStyle()}}>
        <span className="todo-count">
          <strong>
            {this.data.filter(i => i.completed === false).length}
          </strong>
          item left
        </span>
        <ul className="filters">
          <li>
            <a className={(this.state.activeModel == FILTER_TYPES.ALL) ? 'selected' : ''} href="#/" onClick={this.filter.bind(this, FILTER_TYPES.ALL)}>All</a>
          </li>
          <li>
            <a className={(this.state.activeModel == FILTER_TYPES.ACTIVE) ? 'selected' : ''} href="#/active" onClick={this.filter.bind(this, FILTER_TYPES.ACTIVE)}>Active</a>
          </li>
          <li>
            <a className={(this.state.activeModel == FILTER_TYPES.COMPLETED) ? 'selected' : ''} href="#/completed" onClick={this.filter.bind(this, FILTER_TYPES.COMPLETED)}>Completed</a>
          </li>
        </ul>
        {clearButton}
      </footer>
    );
  }

  render() {
    return (
      <div>
        <section className="todoapp">
          {this.renderHeader()}

          {this.renderMain()}

          {this.renderFooter()}
        </section>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

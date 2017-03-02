require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ToDoItem from './toDoItem.js'

const ENTER_KEY = 13;

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.data = [
      {
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

    this.state = {
      newTodo: false
    };
  }

  newTodo(e) {
    if (e.keyCode == ENTER_KEY) {
      let {inputForNewToDo} = this.refs;

      let toDoLabel = inputForNewToDo.value;

      if (toDoLabel.trim().length > 0) {
        this.data.push({
          title: toDoLabel,
          completed: false
        });

        this.setState({
          newTodo: true
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

  renderMain() {
    let datas = this.data;

    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        {/*<label for="toggle-all">Mark all as complete</label>*/}
        <ul className="todo-list">
          {/*These are here just to show the structure of the list items*/}
          {/*List items should get the class `editing` when editing and `completed` when marked as completed*/}

          {
            datas.map((item, key) => {
              return (<ToDoItem item={item} key={key}/>);
            })
          }

          <li className="completed">
            <div className="view">
              <input className="toggle" type="checkbox" checked />
              <label>Taste JavaScript</label>
              <button className="destroy" />
            </div>
            <input className="edit" value="Create a TodoMVC template" />
          </li>


        </ul>
      </section>
    );
  }

  renderFooter() {
    return (
      <footer className="footer">
        {/*This should be `0 items left` by default*/}
        <span className="todo-count"><strong>0</strong> item left</span>
        {/*Remove this if you don't implement routing*/}
        {/*<ul className="filters">*/}
        {/*<li>*/}
        {/*<a className="selected" href="#/">All</a>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*<a href="#/active">Active</a>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*<a href="#/completed">Completed</a>*/}
        {/*</li>*/}
        {/*</ul>*/}
        {/*Hidden if no completed items are left ↓*/}
        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }

  render() {
    return (
      <div>
        <section className="todoapp">
          {this.renderHeader()}

          {/*This section should be hidden by default and shown when there are todos*/}
          {this.renderMain()}

          {/*This footer should hidden by default and shown when there are todos*/}
          {this.renderFooter()}
        </section>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

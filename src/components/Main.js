require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Header from './header.jsx';
import Footer from './Footer.jsx';
import Footernote from './Footernote.jsx';
import Task from './task.jsx';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskList: [],
      displayView: 0,
      toggleAll: false
    }
  }

  toggleAll() {
    if(!this.state.taskList.length)
      return;

    let toggleAll = !this.state.toggleAll;
    this.setState({
      toggleAll: toggleAll
    });

    for(let i=0;i<this.state.taskList.length;i++){
      this.state.taskList[i].complete = toggleAll;
    }
  }


  addNewTask(taskName) {
    let taskList = this.state.taskList;
    taskList.push({
      'taskName': taskName,
      'complete': false
    });
    this.setState({
      taskList: taskList
    });
  }

  removeThisItem(i) {
    let taskList = this.state.taskList;
    taskList.splice(i, 1);
    this.setState({
      taskList: taskList
    })
  }

  changeTaskName(i, newTaskName) {
    let taskList = this.state.taskList;
    taskList[i].taskName = newTaskName;
    if (newTaskName.length === 0) {
      taskList.splice(i, 1);
    }
    this.setState({
      taskList: taskList
    });
  }

  completeClicked(i) {
    let taskList = this.state.taskList;

    taskList[i].complete = !taskList[i].complete;

    this.setState({
      taskList: taskList
    })
  }

  clearCompleted() {
    let taskNameList = this.state.taskList;

    for (let i = this.state.taskList.length; i > 0; i--) {
      if (taskNameList[i - 1].complete === true) {
        taskNameList.splice(i - 1, 1);
      }
    }

    this.setState({
      taskList: taskNameList
    });
  }

  showActive() {
    this.setState({
      displayView: 1
    });
  }

  showCompleted() {
    this.setState({
      displayView: 2
    });
  }

  showAll() {
    this.setState({
      displayView: 0
    })
  }

  render() {
    let taskList=this.state.taskList;
    let completeList=[];
    let activeList=[];
    let displayView = this.state.displayView;

    for(let i=0;i<this.state.taskList.length;i++){
      if(this.state.taskList[i].complete===true){
        completeList.push(this.state.taskList[i]);
      } else if(this.state.taskList[i].complete === false){
        activeList.push(this.state.taskList[i]);
      }
    }
    if(displayView == 1){
      taskList = activeList;
    } else if(displayView == 2){
      taskList = completeList;
    }
    let taskItems = taskList.map((taskInfo,i) => <Task taskInfo={taskInfo}
                                                       key={taskInfo.taskName+i}
                                                       addNewTask={this.addNewTask.bind(this)}
                                                       removeThisItem={this.removeThisItem.bind(this,i)}
                                                       changeTaskName={this.changeTaskName.bind(this,i)}
                                                       completeClicked={this.completeClicked.bind(this,i)}/>);

    return (
      <div>
        <section className="todoapp">
          <Header addNewTask={this.addNewTask.bind(this)}/>
          <section className="main" >
            <input className="toggle-all" type="checkbox"  onClick={this.toggleAll.bind(this)} />
            <ul className="todo-list">
              {taskItems}
            </ul>
          </section>
          <Footer taskNumber={this.state.taskList.length}
                  completeList={completeList.length}
                  clearCompleted={this.clearCompleted.bind(this)}
                  showActive={this.showActive.bind(this)}
                  showCompleted={this.showCompleted.bind(this)}
                  showAll={this.showAll.bind(this)}
                  displayView={this.state.displayView}/>
        </section>
        <Footernote/>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
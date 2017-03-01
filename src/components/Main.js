require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Header from './header.jsx';
import Footer from './Footer.jsx';
import Footernote from './Footernote.jsx';
import Tasks from './tasks.jsx';
// let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      taskList: [],
      displayView:[true,false,false]
    }
  }

  addNewTask(taskName){
    let taskList = this.state.taskList;
    taskList.push({'taskName':taskName,'complete':false});
    this.setState({
      taskList:taskList
    });
  }

  removeThisItem(i){
    console.log(i);
    let taskList=this.state.taskList;
    console.log(taskList[i]);
    taskList.splice(i,1);
    this.setState({
      taskList: taskList
    })
  }

  changeTaskName(i,newTaskName){
    let taskList=this.state.taskList;
    taskList[i].taskName=newTaskName;
    if(newTaskName.length === 0){
      taskList.splice(i,1);
    }
    this.setState({
      taskList:taskList
    });
  }

  completeClicked(i){
    let taskList=this.state.taskList;

    taskList[i].complete=!taskList[i].complete;

    this.setState({
      taskList:taskList
    })
  }

  clearCompleted(){
    let taskNameList=this.state.taskList;

    for(let i=this.state.taskList.length;i>0;i--){
      if(taskNameList[i-1].complete===true){
        taskNameList.splice(i-1,1);
      }
    }

    this.setState({
      taskList:taskNameList
    });
  }

  showActive(){
    this.setState({
      displayView:[false,true,false]
    });
  }

  showCompleted(){
    this.setState({
      displayView:[false,false,true]
    });
  }

  showAll(){
    this.setState({
      displayView:[true,false,false]
    })
  }

  render() {
    let completeList=[];
    let activeList=[];
    let taskList;
    for(let i=0;i<this.state.taskList.length;i++){
      if(this.state.taskList[i].complete===true){
        completeList.push(this.state.taskList[i]);
      } else if(this.state.taskList[i].complete===false){
        activeList.push(this.state.taskList[i]);
      }
    }

    let displayView=this.state.displayView.indexOf(true);

    if(displayView===0){
      taskList=this.state.taskList;
    } else if(displayView === 1){
      taskList=activeList;
    } else if(displayView === 2){
      taskList=completeList;
    }

    return (
      <div>
        <section className="todoapp">
          <Header addNewTask={this.addNewTask.bind(this)}/>
          <section className="main" >
            <input className="toggle-all" type="checkbox"/>
            <Tasks taskList={taskList}
                   addNewTask={this.addNewTask.bind(this)}
                   removeThisItem={this.removeThisItem.bind(this)}
                   changeTaskName={this.changeTaskName.bind(this)}
                   completeClicked={this.completeClicked.bind(this)}/>
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
require('normalize.css/normalize.css');
require('styles/App.css');
 
import React from 'react';
import Header from './header.jsx';
import Footer from './Footer.jsx';
import Footernote from './Footernote.jsx';
import Task from './task.jsx';
import TaskStore from '../stores/task-store.jsx';
import TaskActions from '../actions/task-actions.jsx';

window.TaskActions = TaskActions;
window.TaskStore = TaskStore;

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskList: [],
      displayView: 0,
      toggleAll: false
    }
  }

  toggleAll() { 
    TaskActions.toggleAll();
    console.log(this.props.taskList);
    this.setState({
    	taskList: this.props.taskList
    }) 
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

  componentWillMount(){ 
    this.setState({
      taskList: this.props.taskList 
    });
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
                                                       numberTag = {i}                                                
                                                       />);

    return (
      <div>
        <section className="todoapp">
          <Header/>
          <section className="main" >
            <input className="toggle-all" type="checkbox"  onClick={this.toggleAll.bind(this)} />
            <ul className="todo-list">
              {taskItems}
            </ul>
          </section>
          <Footer taskNumber={this.state.taskList.length}
                  completeList={completeList.length} 
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

Body.defaultProps = {}; 

export default Body;
import alt from '../alt';
import TaskActions from '../actions/task-actions';


class TaskStore{
	constructor(){
		// this.taskList=[{'taskName':'Take a nap', 'complete': true }, {'taskName':'Take a shower', 'complete': false}];
		this.taskList = JSON.parse(localStorage.getItem('taskList')); 

		if(localStorage.getItem('taskList')){
     	  this.taskList = JSON.parse(localStorage.getItem('taskList')); 
		} else {
			this.taskList = [];
		}

		this.bindListeners({
			handleFetchTask: TaskActions.FETCH_TASK,
			handleAddNewItem: TaskActions.ADD_NEW_TASK,
			handleTaskModified: TaskActions.TASK_MODIFIED,
			handleTaskDeleted: TaskActions.REMOVE_ITEM,
			handleToggleAll: TaskActions.TOGGLE_ALL,
			handleComplete: TaskActions.COMPLETE,
			handleClearCompleted: TaskActions.CLEAR_COMPLETED
		});
	}

	handleFetchTask(){
		// console.log(this.taskList); 
	}

	handleAddNewItem(taskItem){ 
		this.taskList.push({'taskName':taskItem, 'complete': false}); 
		localStorage.setItem("taskList",JSON.stringify(this.taskList));
	}

	handleTaskModified(options){    //When there are two parameters occur, an error emerges.
		this.taskList[options[0]].taskName = options[1];
		localStorage.setItem("taskList",JSON.stringify(this.taskList));
	}

	handleTaskDeleted(taskItem){

	}

	handleToggleAll(){
		for(let i=0;i<this.taskList.length;i++){
			this.taskList[i].complete = true;
		}
		localStorage.setItem("taskList",JSON.stringify(this.taskList));
	}

	handleComplete(i){
		this.taskList[i].complete = !this.taskList[i].complete;
		localStorage.setItem("taskList",JSON.stringify(this.taskList));
	}

	handleClearCompleted(){
	    for (let i = this.taskList.length; i > 0; i--) {
	      if (this.taskList[i - 1].complete === true) {
	        this.taskList.splice(i - 1, 1);
	      }
	    }
		localStorage.setItem("taskList",JSON.stringify(this.taskList));
	}

	handleTaskDeleted(i){
		this.taskList.splice(i,1);
		localStorage.setItem("taskList",JSON.stringify(this.taskList));
	}
}

export default alt.createStore(TaskStore,'TaskStore');
import alt from '../alt';
import jQuery from 

var TaskListSource = {
	getTaskList:{
		remote(state){
			return new Promise(function(resolve, reject){
				Ajax.post({
					url:'../../mockup/taskList',
					data:{

					},
					success: function(response){
						console.log(response);
					},
					error: function(){
						reject('error.generalErrorMessage');
					}
				}, null, )
			})
		},

		local(state){

		},

		// loading: TaskActions.loadingTaskList,
		success: TaskActions.taskListLoaded,
		error: TaskActions.fetchingTaskListFailed
	}})
	}
}
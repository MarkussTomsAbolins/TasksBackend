import { TaskData, TaskList } from "./models/taskdata";

function mergeResponse(response: any[]){
    const taskList: TaskList = {
        tasks: []
    };
    response.forEach(item => {
        if(item.title && item.id){
            taskList.tasks.push(item);
        }
    });
    return taskList;
}

export default mergeResponse;
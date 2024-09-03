import { TaskData, TaskList } from "./models/taskdata";

function mergeResponse(response: any[]){
    const taskList: TaskList = {
        tasks: []
    };
    response.forEach(item => {
        if (item._doc && item._doc.tasks && Array.isArray(item._doc.tasks)) {
            item._doc.tasks.forEach((task: any) => {
                taskList.tasks.push(task);
            });
        }
    });
    return taskList;
}

export default mergeResponse;
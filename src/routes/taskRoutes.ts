import express, {Request, Response} from "express";
import Task, { TaskData, TaskList } from "../models/taskdata";
import mergeResponse from "../util";

const router = express.Router();

router.get('/allTasks', [],async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        const tasks: TaskList[] = await Task.find();
        console.log(tasks);
        return res.send(mergeResponse(tasks));
    } catch (error) {
        console.log("Error while fetching tasks: " + error);
    }
});

router.get('/task/:id', async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
        return res.status(400).send({ error: 'Invalid task ID' });
    }

    try {
        const taskDocument = await Task.findOne({ "id": taskId }) as any | null;
        console.log(taskDocument);
        if (!taskDocument) {
            return res.status(404).send({ error: 'Task not found' });
        }
        return res.send(taskDocument);
    } catch (error) {
        console.log("Error while fetching task: " + error);
        return res.status(500).send({ error: 'Server error' });
    }
});

router.delete('/removeTask/:id', async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const taskId = parseInt(req.params.id);
    console.log("Deleting task:" +taskId);
    if (isNaN(taskId)) {
        return res.status(400).send({ error: 'Invalid task ID' });
    }
    try {
        await Task.findOneAndDelete({"id": taskId});
        res.json({ msg: "Task removed" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Server error' });
    }
    

});

router.post('/createTask', async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const taskData: TaskData = req.body;
    if (!taskData.title || !taskData.description || !taskData.type || !taskData.createdOn 
        || !taskData.status || taskData.id == null) {
        return res.status(400).send({ error: 'Missing required fields' });
    }
    console.log(taskData);
    try {
        const taskDocument = await Task.findOne({ "id": taskData.id }) as any | null;
        if(taskDocument){
            return res.status(500).send({message: 'Duplicate ID'});
        }
        const newDocument = new Task(taskData);
        await newDocument.save();

        return res.status(201).send({ message: 'Task created successfully', task: newDocument });
    } catch (error) {
        console.log("Error while creating task: " + error);
        return res.status(500).send({ error: 'Server error' });
    }
});


export {router as taskRouter}
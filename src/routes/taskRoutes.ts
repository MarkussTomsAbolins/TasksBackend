import express, {Request, Response} from "express";
import Task, { TaskData, TaskList } from "../models/taskdata";
import mergeResponse from "../util";

const router = express.Router();

router.get('/allTasks', [],async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        const tasks: TaskList[] = await Task.find();
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
        const taskDocument = await Task.findOne({ "tasks.id": taskId }, { "tasks.$": 1 }) as any | null;
        if (!taskDocument || taskDocument._doc.tasks.length === 0) {
            return res.status(404).send({ error: 'Task not found' });
        }
        return res.send(taskDocument._doc.tasks[0]);
    } catch (error) {
        console.log("Error while fetching task: " + error);
        return res.status(500).send({ error: 'Server error' });
    }
});

router.delete('/removeTask/:id', async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
        return res.status(400).send({ error: 'Invalid task ID' });
    }

    try {
        const result = await Task.updateOne(
            { "tasks.id": taskId },
            { $pull: { tasks: { id: taskId } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send({ error: 'Task not found' });
        }

        return res.send({ message: 'Task deleted successfully' });
    } catch (error) {
        console.log("Error while deleting task: " + error);
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

    try {
        const result = await Task.updateOne(
            { },
            { $push: { tasks: taskData } }
        );

        if (result.modifiedCount === 0) {
            return res.status(500).send({ error: 'Failed to add task' });
        }

        return res.status(201).send({ message: 'Task created successfully' });
    } catch (error) {
        console.log("Error while creating task: " + error);
        return res.status(500).send({ error: 'Server error' });
    }
});


export {router as taskRouter}
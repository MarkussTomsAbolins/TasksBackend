import express, {Request, Response} from "express";
import Task from "../models/taskdata";

const router = express.Router();

router.get('/allTasks', [],async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        //combine documents here pls
        const tasks = await Task.find();
        console.log(tasks);
        return res.send(tasks);
    } catch (error) {
        console.log("Error while fetching tasks: " + error);
    }
})

router.get('/task/:id', (req, res) =>{
    let _id = req.params.id
    return res.send("Would get task with id: " + _id);
})

router.delete('removeTask/:id', (req, res) =>{
    let _id = req.params.id
    return res.send("Would delete task with id: " + _id);
})

router.post('/createTask', [], async (req: Request, res: Response)=>{
    return res.send("Would create new task");
})

export {router as taskRouter}
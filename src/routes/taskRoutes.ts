import express, {Request, Response} from "express";

const router = express.Router();

router.get('/allTasks', [],(req: Request, res: Response) => {
    return res.send("All tasks wip");
})

router.get('/task/:id', (req, res) =>{
    let _id = req.params.id
    return res.send("Would get task with id: " + _id);
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
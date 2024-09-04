import express from 'express';
import { json } from 'body-parser';
import { taskRouter } from './routes/taskRoutes';
import connectDB from "../config/db";
import cors from 'cors';



const app = express();
const port = 3001;
app.use(cors({origin:'http://localhost:4200'}));
app.use(json());
app.use(taskRouter);



connectDB();

app.listen(port, () => {
    console.log('server is listening on port: ' + port);
})
import express from 'express';
import { json } from 'body-parser';
import { taskRouter } from './routes/taskRoutes';
import connectDB from "../config/db";
import Cors from 'cors';



const app = express();
const port = 3001;
app.use(json());
app.use(taskRouter);
app.use(Cors({origin: 'http://localhost:4200'}));



connectDB();

app.listen(port, () => {
    console.log('server is listening on port: ' + port);
})
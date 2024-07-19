import express from 'express';
import { json } from 'body-parser';
import { taskRouter } from './routes/taskRoutes';
import connectDB from "../config/db";


const app = express();
const port = 3001;
app.use(json());
app.use(taskRouter);

connectDB();

app.listen(port, () => {
    console.log('server is listening on port: ' + port);
})
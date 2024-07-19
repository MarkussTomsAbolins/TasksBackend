import mongoose, { model, Schema } from "mongoose";

export interface TaskData {
    title: string;
    description: string;
    type: string;
    createdOn: string;
    status: string;
    id: number;
}

export interface TaskList {
    tasks: TaskData[];
}

const TaskSchema: Schema = new Schema({
    title: { type: String },
    description: { type: String },
    type: { type: String },
    createdOn: { type: String },
    status: { type: String },
    id: { type: Number }
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
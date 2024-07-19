import express from 'express';
import { json } from 'body-parser';


const app = express();
const port = 3001;
app.use(json());




app.listen(port, () => {
    console.log('server is listening on port: ' + port);
})
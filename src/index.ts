import express, { Request, Response } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose  from 'mongoose';

import router from "./router";


const app = express();
const server = http.createServer(app);

const PORT: number = 8080;

const MongoUrl : string = "mongodb://localhost:27017/ts-tutorial"

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response): void => {
    res.status(200).send('Home Page'); // Corrected status code to 200 for successful response
});

server.listen(PORT, (): void => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(MongoUrl).then(():void=>{
    console.log("Connected to MongoDB");
})

mongoose.connection.on('error', (err:Error)=>{
    console.log(err)
})

app.use('/', router())
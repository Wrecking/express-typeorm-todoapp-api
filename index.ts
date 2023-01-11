import express, { Express } from 'express';

import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Task } from './src/tasks/tasks.entity';

import cors from 'cors';
import bodyParser from 'body-parser';

import { tasksRouter } from './src/tasks/tasks.router';

// Init express app
const app: Express = express();
dotenv.config();

// Parse request Body
app.use(bodyParser.json());

// Use CORS install types as well
app.use(cors());

// Create Database Connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
});

// Define server port
const port = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    // Start listening to the requests on the defined port
    app.listen(port, () => console.log('listening..'));
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

// Router
app.use('/', tasksRouter);

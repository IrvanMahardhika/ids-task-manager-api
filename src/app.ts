import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import userRouter from '@infras/routers/user';
import taskRouter from '@infras/routers/task';
import noteRouter from '@infras/routers/note';

export default class App {
  private app: Express;
  private environment: String;
  private port: String | Number;

  constructor() {
    this.app = express();
    this.environment = process.env.NODE_ENV || 'development';
    this.port = process.env.PORT || 7070;
  }

  private setExpressConfig(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: '500mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
    this.app.use(express.json({ limit: '500mb' }));
    this.app.use((req, res, next) => {
      res.header(
        'Cache-Control',
        'private, no-cache, no-store, must-revalidate',
      );
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, Accept, Accept-Version, Authorization, Content-Length, Cache-Control, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token',
      );
      next();
    });
  }

  private setRouters(): void {
    this.app.use('/user', userRouter);
    this.app.use('/task', taskRouter);
    this.app.use('/note', noteRouter);
  }

  initialize(): void {
    this.setExpressConfig();
    this.setRouters();
    this.app.get('/', (req, res) => {
      const environment = process.env.NODE_ENV || 'development';
      res
        .status(200)
        .send(`Welcome to IDS API || Running in ${environment} mode`);
    });
    this.app.listen(this.port, () =>
      console.log(
        `App listening on port ${this.port}! Running in ${this.environment} mode`,
      ),
    );
  }
}

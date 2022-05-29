import express, { Express, json } from 'express';
import cors from 'cors';

export const configureServer = (): Express => {
  const app: Express = express();

  app.use(cors());
  app.use(json());

  return app;
};

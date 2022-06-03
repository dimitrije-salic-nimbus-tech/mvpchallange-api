import { configureDatabase, closeConnection } from '../src/lib/config/db';
import { configureServer } from '../src/lib/config/server';
import { configureRoutes } from '../src/lib/routes/configureRoutes';

let app = null;

global.beforeAll(async () => {
  app = configureServer();
  // @ts-ignore
  global.app = app;
  await configureDatabase();
  configureRoutes(app);
});

global.beforeEach(async () => {
  const connection = await configureDatabase();
  // drop data
  await connection.synchronize(true);
});

global.afterAll(async () => {
  await closeConnection();
});

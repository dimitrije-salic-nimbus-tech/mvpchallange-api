import { Express } from 'express';

import { configureServer } from './lib/config/server';
import { environment } from './lib/config/env';
import { configureDatabase } from './lib/config/db';
import { configureRoutes } from './lib/routes/configureRoutes';

(async () => {
  const server: Express = configureServer();

  await configureDatabase();
  configureRoutes(server);

  server.listen(environment.port, () => console.log(`${environment.serviceName} is up on port ${environment.port}`));
})();

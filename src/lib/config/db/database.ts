import { Connection, createConnection } from 'typeorm';

import { ENTITIES } from '../../entities';
import { environment } from '../env';

let connection: Connection | null = null;

export const configureDatabase = async (): Promise<Connection> => {
  if (connection) {
    return connection;
  }

  return createConnection({
    database: environment.database.name,
    entities: ENTITIES,
    host: environment.database.host,
    logging: false,
    migrationsRun: environment.env === 'test',
    name: 'mvpmatch',
    password: environment.database.password,
    port: environment.database.port,
    synchronize: environment.env === 'test',
    type: 'postgres',
    username: environment.database.user,
  });
};

export const closeConnection = async (): Promise<void> => {
  connection?.close().then(() => Promise.resolve());
};

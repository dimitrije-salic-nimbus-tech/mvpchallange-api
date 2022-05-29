import * as dotenv from 'dotenv'

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

// This config is used exclusively for TypeORM CLI.
const connections = [
  {
    cli: {
      entitiesDir: 'src/lib/entities',
      migrationsDir: 'src/lib/config/db/migrations',
    },
    database: process.env.POSTGRES_DB_NAME || 'Enter your DB name',
    entities: ['src/lib/entities/*.ts'],
    host: process.env.POSTGRES_HOST || 'localhost',
    migrations: ['src/lib/config/db/migrations/*.ts'],
    migrationsRun: false,
    name: 'mvpmatch',
    password: process.env.POSTGRES_PASSWORD || 'Enter your DB password!',
    port: +(process.env.POSTGRES_PORT || 5432),
    synchronize: false,
    type: 'postgres',
    username: process.env.POSTGRES_USER || 'Enter your DB username!',
  },
];

module.exports = connections;

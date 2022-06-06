import * as dotenv from 'dotenv';
import { EnvType, ServiceEnvironmentType } from '../../shared/types';

dotenv.config({
  path: `${__dirname}/../../../../.env.${process.env.NODE_ENV}`,
});

export const environment: ServiceEnvironmentType = {
  env: (process.env.NODE_ENV as EnvType) || 'dev',
  port: +(process.env.SERVICE_PORT || 3010),
  salt: +(process.env.SALT || 10),
  serviceName: process.env.SERVICE_NAME || 'MvpMatch',
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    name: process.env.POSTGRES_DB_NAME || 'Enter your DB name',
    password: process.env.POSTGRES_PASSWORD || 'Enter your DB password!',
    port: +(process.env.POSTGRES_PORT || 5432),
    user: process.env.POSTGRES_USER || 'Enter your DB username!',
  },
  cognito: {
    domainName: process.env.AUTH_DOMAIN || 'Enter your domain name',
    clientId: process.env.CLIENT_ID || 'Enter your client id',
    redirectUri: process.env.REDIRECT_URI || 'Enter your redirect uri',
    poolId: process.env.POOL_ID || 'Enter your pool id',
    region: process.env.REGION || 'Enter region',
    tokenUse: process.env.TOKEN_USE || 'Enter token use',
    tokenExpiration: +(process.env.TOKEN_EXPIRATION || 3600000),
  },
  redis: {
    port: +(process.env.REDIS_PORT || 6379),
    host: process.env.REDIS_HOST || 'localhost',
  },
};

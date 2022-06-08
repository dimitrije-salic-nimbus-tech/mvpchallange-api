export type EnvType = 'dev' | 'prod' | 'test';

export type ServiceEnvironmentType = {
  port: number;
  env: EnvType;
  serviceName: string;
  salt: number;
  database: {
    name: string;
    host: string;
    password: string;
    user: string;
    port: number;
  };
  cognito: {
    domainName: string;
    clientId: string;
    redirectUri: string;
    poolId: string;
    region: string;
    tokenUse: string;
    tokenExpiration: number;
    responseType: string;
  };
  redis: {
    port: number;
    host: string;
  };
};

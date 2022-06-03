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
  };
};

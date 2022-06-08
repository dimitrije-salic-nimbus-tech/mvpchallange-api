import CognitoExpress from 'cognito-express';

import { environment } from '../env';

export const cognitoExpress = new CognitoExpress({
  region: environment.cognito.region,
  cognitoUserPoolId: environment.cognito.poolId,
  tokenUse: environment.cognito.tokenUse,
  tokenExpiration: environment.cognito.tokenExpiration,
});

import { Request, Response, NextFunction } from 'express';
import CognitoExpress from 'cognito-express';

import { environment } from '../../config/env';
import { AuthenticationFailedException } from '../../exceptions/shared/AuthenticationFailedException';
import { unauthorizedRoutes } from '../../utils/auth';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (Array.from(unauthorizedRoutes).some(([key, value]) => key === req.url && value === req.method)) {
    next();
    return;
  }

  const cognitoExpress = new CognitoExpress({
    region: environment.cognito.region,
    cognitoUserPoolId: environment.cognito.poolId,
    tokenUse: environment.cognito.tokenUse,
    tokenExpiration: environment.cognito.tokenExpiration,
  });
  const accessTokenFromClient = req.headers.accesstoken;

  if (!accessTokenFromClient) {
    throw new AuthenticationFailedException();
  }

  cognitoExpress.validate(accessTokenFromClient, (err, response) => {
    if (err) {
      throw new AuthenticationFailedException();
    }

    res.locals.user = response;
    next();
  });
};

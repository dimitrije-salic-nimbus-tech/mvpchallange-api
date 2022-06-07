import { NextFunction, Request, Response } from 'express';
import CognitoExpress from 'cognito-express';

import { environment } from '../../config/env';
import { UnauthorizedException } from '../../exceptions/shared';
import { unauthorizedRoutes } from '../../utils/auth';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
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
    next(new UnauthorizedException());
  }

  try {
    res.locals.user = await cognitoExpress.validate(accessTokenFromClient);
    next();
  } catch (e) {
    next(new UnauthorizedException());
  }


};

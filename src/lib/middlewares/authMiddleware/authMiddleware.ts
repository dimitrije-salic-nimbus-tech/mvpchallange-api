import { NextFunction, Request, Response } from 'express';

import { UnauthorizedException } from '../../exceptions/shared';
import { unauthorizedRoutes } from '../../utils/auth';
import { cognitoExpress } from '../../config/cognito';
import { environment } from '../../config/env';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (environment.env === 'test') {
    // TODO: remove this and generate token for testing purpose
    next();
    return;
  }

  if (Array.from(unauthorizedRoutes).some(([key, value]) => key === req.url.split('?')[0] && value === req.method)) {
    next();
    return;
  }

  const accessTokenFromClient = req.headers.accesstoken;

  if (!accessTokenFromClient) {
    next(new UnauthorizedException());
    return
  }

  try {
    res.locals.user = await cognitoExpress.validate(accessTokenFromClient);
    next();
  } catch (e) {
    next(new UnauthorizedException());
  }
};

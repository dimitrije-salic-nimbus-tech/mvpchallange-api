import { NextFunction, Request, Response } from 'express';

import { PermissionActionType } from '../../shared/types';
import { userService } from '../../../api/user/service';
import { MethodNotAllowedException } from '../../exceptions/shared';

export const permit = (permission: PermissionActionType) => async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  const allowed: PermissionActionType[] = await userService.getUserPermissions(user.username);

  if (!allowed.some((perm: PermissionActionType) => perm === permission)) {
    next(new MethodNotAllowedException());
  }
  next();
};

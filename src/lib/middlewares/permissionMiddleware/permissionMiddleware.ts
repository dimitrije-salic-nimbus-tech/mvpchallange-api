import { NextFunction, Request, Response } from 'express';

import { PermissionActionType } from '../../shared/types';
import { userService } from '../../../api/user/service';
import { MethodNotAllowedException } from '../../exceptions/shared';
import { GetUserPermissionsResponse } from '../../../api/user/dto/response';
import { ProductResponse } from '../../../api/product/dto/response';
import { productService } from '../../../api/product/service';

export const permit = (permission: PermissionActionType) => async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  const userPermissionsResponse: GetUserPermissionsResponse = await userService.getUserPermissions(user.username);

  const { permissions } = userPermissionsResponse;
  if (!permissions.some((perm: PermissionActionType) => perm === permission)) {
    next(new MethodNotAllowedException());
  }

  const { params } = req;
  if (params.id && permission === 'product:write') {
    const product: ProductResponse = await productService.getProduct(params.id);
    if (product.seller.id !== params.id) {
      next(new MethodNotAllowedException());
    }
  }
  next();
};

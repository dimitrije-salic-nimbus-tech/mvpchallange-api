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
    return;
  }

  // add generate method to avoid switch case
  switch (permission) {
    case 'product:write':
      if (req.params.id) {
        const product: ProductResponse = await productService.getProduct(req.params.id);
        if (product.seller.id !== userPermissionsResponse.id) {
          next(new MethodNotAllowedException());
          return;
        }
      }
      break;
    case 'product:delete':
      const product: ProductResponse = await productService.getProduct(req.params.id);
      if (product.seller.id !== userPermissionsResponse.id) {
        next(new MethodNotAllowedException());
        return;
      }
      break;
    case 'deposit:write':
      if (userPermissionsResponse.id !== req.params.id) {
        next(new MethodNotAllowedException());
        return;
      }
      break;
  }
  next();
};

import { NextFunction, Request, Response, Router } from 'express';
import { celebrate } from 'celebrate';

import { userService, userDepositService } from '../../service';
import {UserFullResponse, UserResponse} from '../../dto/response';
import { userSchemas } from './UserSchemas';
import { PageableItems } from '../../../../lib/shared/dto/pagination';
import { ChangeDepositRequest } from '../../dto/request';
import { UpdateUserRequest } from '../../dto/request';
import { queryPaginationSchemas } from '../../../../lib/utils/validation/pagination';
import { QueryParamsPaginationType } from '../../../../lib/shared/types';
import { createPageableRequest } from '../../../../lib/utils/mapper/pagination';
import { permit } from '../../../../lib/middlewares/permissionMiddleware';

const router = Router();

router.get(
  '/',
  [celebrate(queryPaginationSchemas.queryPagination), permit('user:read')],
  (req: Request<{}, any, {}, QueryParamsPaginationType>, res: Response, next: NextFunction) => {
    const { query } = req;

    userService
      .getUsers(createPageableRequest(query))
      .then((users: PageableItems<UserResponse>) => res.send(users))
      .catch(next);
  },
);

router.get(
  '/:id',
  [celebrate(userSchemas.getUserSchema), permit('user:read')],
  (req: Request<{ id: string }, any, {}>, res: Response, next: NextFunction) => {
    const { params } = req;

    userService
      .getUser(params.id)
      .then((user: UserResponse) => res.send(user))
      .catch(next);
  },
);

router.patch(
  '/:id',
  [celebrate(userSchemas.updateUserSchema), permit('user:write')],
  (req: Request<{ id: string }, any, UpdateUserRequest>, res: Response, next: NextFunction) => {
    const { body, params } = req;

    userService
      .updateUser(params.id, body)
      .then(() => res.send())
      .catch(next);
  },
);

router.delete(
  '/:id',
  [celebrate(userSchemas.getUserSchema), permit('user:delete')],
  (req: Request<{ id: string }, any, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    userService
      .deleteUser(id)
      .then(() => res.status(204).send())
      .catch(next);
  },
);

router.post(
  '/:id/add-deposit',
  [celebrate(userSchemas.addDepositSchema), permit('deposit:write')],
  (req: Request<{ id: string }, any, ChangeDepositRequest>, res: Response, next: NextFunction) => {
    const { params, body } = req;

    userDepositService
      .changeDeposit(params.id, body)
      .then((user: UserFullResponse) => res.send(user))
      .catch(next);
  },
);

router.post(
  '/:id/reset-deposit',
  [celebrate(userSchemas.getUserSchema), permit('deposit:write')],
  (req: Request<{ id: string }, any, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    userDepositService
      .resetDeposit(id)
      .then((user: UserFullResponse) => res.send(user))
      .catch(next);
  },
);

export default router;

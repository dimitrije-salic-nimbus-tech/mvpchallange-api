import { NextFunction, Request, Response, Router } from 'express';
import { celebrate } from 'celebrate';

import { userService, userDepositService } from '../../service';
import { UserResponse } from '../../dto/response';
import { userSchemas } from './UserSchemas';
import { PageableItems } from '../../../../lib/dto/pagination';
import { ChangeDepositRequest, CreateUserRequest } from '../../dto/request';
import { UpdateUserRequest } from '../../dto/request';
import { queryPaginationSchemas } from '../../../pagination';
import { QueryParamsPaginationType } from '../../../../lib/types';
import { createPageableRequest } from '../../../../lib/utils/mapper/pagination';

const router = Router();

router.post(
  '/',
  [celebrate(userSchemas.createUserSchema)],
  (req: Request<{}, any, CreateUserRequest>, res: Response, next: NextFunction) => {
    const { body } = req;

    userService
      .createUser(body)
      .then(() => res.status(201).send())
      .catch(next);
  },
);

router.get(
  '/',
  [celebrate(queryPaginationSchemas.queryPagination)],
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
  [celebrate(userSchemas.getUserSchema)],
  (req: Request<{ id: string }, any, {}>, res: Response, next: NextFunction) => {
    const { params } = req;

    userService
      .getUser(params.id)
      .then((user: UserResponse) => res.send(user))
      .catch(next);
  },
);

router.patch('/:id', [
  celebrate(userSchemas.updateUserSchema),
  (req: Request<{ id: string }, any, UpdateUserRequest>, res: Response, next: NextFunction) => {
    const { body, params } = req;

    userService
      .updateUser(params.id, body)
      .then(() => res.send())
      .catch(next);
  },
]);

router.delete(
  '/:id',
  [celebrate(userSchemas.getUserSchema)],
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
  [celebrate(userSchemas.addDepositSchema)],
  (req: Request<{ id: string }, any, ChangeDepositRequest>, res: Response, next: NextFunction) => {
    const { params, body } = req;

    userDepositService
      .changeDeposit(params.id, body)
      .then((deposit: string) => res.send(deposit))
      .catch(next);
  },
);

router.post(
  '/:id/reset-deposit',
  [celebrate(userSchemas.getUserSchema)],
  (req: Request<{ id: string }, any, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    userDepositService
      .resetDeposit(id)
      .then(() => res.send())
      .catch(next);
  },
);

export default router;

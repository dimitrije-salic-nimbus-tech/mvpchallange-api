import { NextFunction, Request, Response, Router } from 'express';
import { celebrate } from 'celebrate';

import { userSchemas } from '../../user/routes/user';
import { CreateUserRequest } from '../../user/dto/request';
import { authService } from '../service';

const router = Router();

router.post(
  '/registration',
  [celebrate(userSchemas.createUserSchema)],
  (req: Request<{}, any, CreateUserRequest>, res: Response, next: NextFunction) => {
    const { body } = req;

    authService
      .userRegistration(body)
      .then(() => res.status(201).send())
      .catch(next);
  },
);

export default router;

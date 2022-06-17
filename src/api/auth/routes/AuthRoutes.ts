import { NextFunction, Request, Response, Router } from 'express';
import { celebrate } from 'celebrate';

import { authSchemas } from './AuthSchemas';
import { userSchemas } from '../../user/routes/user';
import { CreateUserRequest } from '../../user/dto/request';
import { authService } from '../service';
import { LoginResponse } from '../dto/response';

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

router.post(
  '/login',
  [celebrate(authSchemas.loginSchema)],
  (req: Request<{}, any, {}, { code: string }>, res: Response, next: NextFunction) => {
    const { code } = req.query;

    authService
      .login(code)
      .then((response: LoginResponse) => res.send(response))
      .catch(next);
  },
);

router.post(
  '/logout',
  (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user

    authService
      .logout(user.username)
      .then(() => res.send())
      .catch(next);
  },
);

export default router;

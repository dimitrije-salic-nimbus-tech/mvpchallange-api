import { NextFunction, Request, Response, Router } from 'express';
import { cognitoService } from '../service';

const router = Router();

router.get('', (req: Request, res: Response) => res.send(cognitoService.getCognitoUrl()));

router.get('/redirect-uri', (req: Request, res: Response, next: NextFunction) => {
  cognitoService
    .cognitoRedirect(req)
    .then(() => res.send())
    .catch(next);
});

export default router;

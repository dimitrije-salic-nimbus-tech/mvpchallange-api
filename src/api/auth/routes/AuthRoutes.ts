import { Request, Response, NextFunction, Router } from 'express';
import { authService } from '../service';

const router = Router();

router.get('', (req: Request, res: Response) => res.send(authService.getCognitoUrl()));

router.get('/redirect-uri', (req: Request, res: Response) => res.send(authService.cognitoRedirect()));

export default router;

import { NextFunction, Request, Response, Router } from 'express';
import { celebrate } from 'celebrate';

import { QueryParamsPaginationType } from '../../../../lib/shared/types';
import { productPriceService } from '../../service';
import { createPageableRequest } from '../../../../lib/utils/mapper/pagination';
import { productPriceSchemas } from './ProductPricesSchemas';
import { PageableItems } from '../../../../lib/shared/dto/pagination';
import { ProductPriceResponse } from '../../dto/response';

const router = Router();

router.get(
  '/:id/user',
  [celebrate(productPriceSchemas.getPricesHistoryByProductSchema)],
  (req: Request<{ id: string }, any, {}, QueryParamsPaginationType>, res: Response, next: NextFunction) => {
    const { query, params } = req;
    productPriceService
      .getPriceHistoryByProduct(params.id, createPageableRequest(query))
      .then((prices: PageableItems<ProductPriceResponse>) => res.send(prices))
      .catch(next);
  },
);

export default router;

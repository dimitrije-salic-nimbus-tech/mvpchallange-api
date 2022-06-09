import { celebrate } from 'celebrate';

import { NextFunction, Request, Response, Router } from 'express';
import { productSchemas } from './ProductSchemas';
import { productService, vendingMachineService } from '../../service';
import { BuyProductRequest, CreateProductRequest, UpdateProductRequest } from '../../dto/request';
import { queryPaginationSchemas } from '../../../../lib/utils/validation/pagination';
import { createPageableRequest } from '../../../../lib/utils/mapper/pagination';
import { QueryParamsPaginationType } from '../../../../lib/shared/types';
import { PageableItems } from '../../../../lib/shared/dto/pagination';
import { BuyProductResponse, ProductResponse } from '../../dto/response';
import { permit } from '../../../../lib/middlewares/permissionMiddleware';

const router = Router();

router.post(
  '/:userId/user',
  [celebrate(productSchemas.createProductSchema), permit('product:write')],
  (req: Request<{ userId: string }, any, CreateProductRequest>, res: Response, next: NextFunction) => {
    const { body, params } = req;

    productService
      .createProduct(params.userId, body)
      .then(() => res.status(201).send())
      .catch(next);
  },
);

router.get(
  '/',
  [celebrate(queryPaginationSchemas.queryPagination)],
  (req: Request<{}, any, {}, QueryParamsPaginationType>, res: Response, next: NextFunction) => {
    const { query } = req;
    productService
      .getProducts(createPageableRequest(query))
      .then((products: PageableItems<ProductResponse>) => res.send(products))
      .catch(next);
  },
);

router.get(
  '/:id',
  [celebrate(productSchemas.getProductSchema)],
  (req: Request<{ id: string }, any, {}>, res: Response, next: NextFunction) => {
    const { params } = req;

    productService
      .getProduct(params.id)
      .then((product: ProductResponse) => res.send(product))
      .catch(next);
  },
);

router.patch(
  '/:id',
  [celebrate(productSchemas.updateProductSchema), permit('product:write')],
  (req: Request<{ id: string }, any, UpdateProductRequest>, res: Response, next: NextFunction) => {
    const { params, body } = req;

    productService
      .updateProduct(params.id, body)
      .then(() => res.send())
      .catch(next);
  },
);

router.delete(
  '/:id',
  [celebrate(productSchemas.getProductSchema), permit('product:delete')],
  (req: Request<{ id: string }, any, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    productService
      .deleteProduct(id)
      .then(() => res.status(204).send())
      .catch(next);
  },
);

router.post(
  '/buy/:id/user',
  [celebrate(productSchemas.buyProductSchema), permit('deposit:write')],
  (req: Request<{ id: string }, any, BuyProductRequest>, res: Response, next: NextFunction) => {
    const { params, body } = req;

    vendingMachineService
      .buyProduct(params.id, body)
      .then((response: BuyProductResponse) => res.send(response))
      .catch(next);
  },
);

export default router;

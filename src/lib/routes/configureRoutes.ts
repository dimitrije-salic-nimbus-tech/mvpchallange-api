import { Application } from 'express';

import { userRoutes } from '../../api/user/routes/user';
import { productRoutes } from '../../api/product/routes/product';
import { productPriceRoutes } from '../../api/product/routes/productPrice';
import { errorHandler } from '../middlewares/errorMiddleware';
import { authRoutes } from '../../api/auth/routes';

export const configureRoutes = (app: Application): void => {
  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/user-prices', productPriceRoutes);
  app.use('/api/cognito', authRoutes);

  app.use(errorHandler);
};

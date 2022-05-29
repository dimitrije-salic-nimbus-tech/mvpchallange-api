import { Repository } from 'typeorm';

import { getBaseRepository } from './BaseRepository';
import { ProductEntity } from '../entities/ProductEntity';

export const getProductRepository = async (): Promise<Repository<ProductEntity>> => {
  return getBaseRepository().getRepository(ProductEntity);
};

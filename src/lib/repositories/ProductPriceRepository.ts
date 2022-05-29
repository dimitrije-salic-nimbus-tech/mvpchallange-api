import { Repository } from 'typeorm';

import { getBaseRepository } from './BaseRepository';
import { ProductPriceEntity } from '../entities/ProductPriceEntity';

export const getProductPriceRepository = async (): Promise<Repository<ProductPriceEntity>> => {
    return getBaseRepository().getRepository(ProductPriceEntity);
};

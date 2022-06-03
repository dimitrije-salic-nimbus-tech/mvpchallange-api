import { getProductPriceRepository } from '../../../lib/repositories';
import { ProductEntity } from '../../../lib/entities/ProductEntity';
import { ProductPriceResponse } from '../dto/response';
import { PageableItems, PageableRequest } from '../../../lib/shared/dto/pagination';
import { createPageableResponse } from '../../../lib/utils/mapper/pagination';
import { mapProductPriceEntitiesToProductPriceResponses } from '../../../lib/utils/mapper/productPrice';

interface IProductPriceService {
  createProductPrice: (price: number, product: ProductEntity) => Promise<void>;
  getPriceHistoryByProduct: (productId: string, query: PageableRequest) => Promise<PageableItems<ProductPriceResponse>>;
}

const createProductPrice = async (price: number, product: ProductEntity): Promise<void> => {
  const productPriceRepository = await getProductPriceRepository();

  return productPriceRepository.save({ price, product }).then(() => Promise.resolve());
};

const getPriceHistoryByProduct = async (
  productId: string,
  query: PageableRequest,
): Promise<PageableItems<ProductPriceResponse>> => {
  const { offset, limit, page } = query;

  const productPriceRepository = await getProductPriceRepository();

  const [items, count] = await productPriceRepository
    .createQueryBuilder('price')
    .where('price.productId = :productId', { productId })
    .orderBy('price.createdAt', 'ASC')
    .skip(offset)
    .take(limit)
    .getManyAndCount();

  return createPageableResponse<ProductPriceResponse>(
    mapProductPriceEntitiesToProductPriceResponses(items),
    limit,
    count,
    page,
  );
};

export const productPriceService: IProductPriceService = {
  createProductPrice,
  getPriceHistoryByProduct,
};

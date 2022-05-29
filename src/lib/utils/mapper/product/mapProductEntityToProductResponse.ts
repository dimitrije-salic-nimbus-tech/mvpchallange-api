import { ProductEntity } from '../../../entities/ProductEntity';
import { ProductResponse } from '../../../../api/product/dto/response';
import { mapToClass } from '../ObjectMapper';
import { getCurrentPrice } from './getCurrentPrice';

export const mapProductEntityToProductResponse = (product: ProductEntity): ProductResponse => {
  const productResponse: ProductResponse = mapToClass<ProductResponse>(product, ProductResponse);

  productResponse.currentPrice = getCurrentPrice(product.prices);
  return productResponse;
};

export const mapProductEntitiesToProductResponses = (products: ProductEntity[]): ProductResponse[] =>
  products.map(mapProductEntityToProductResponse);

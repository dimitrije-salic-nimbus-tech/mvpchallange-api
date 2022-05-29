import { ProductPriceEntity } from '../../../entities/ProductPriceEntity';
import { ProductPriceResponse } from '../../../../api/productPrice/dto/response/ProductPriceResponse';
import { mapToClass } from '../ObjectMapper';

export const mapProductPriceEntityToProductPriceResponse = (price: ProductPriceEntity): ProductPriceResponse =>
  mapToClass<ProductPriceResponse>(price, ProductPriceResponse);

export const mapProductPriceEntitiesToProductPriceResponses = (prices: ProductPriceEntity[]): ProductPriceResponse[] =>
  prices.map(mapProductPriceEntityToProductPriceResponse);

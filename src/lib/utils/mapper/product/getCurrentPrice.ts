import { ProductPriceEntity } from '../../../entities/ProductPriceEntity';

export const getCurrentPrice = (prices: ProductPriceEntity[]): number =>
  // @ts-ignore
  prices.sort((a: ProductPriceEntity, b: ProductPriceEntity) => b.createdAt - a.createdAt)[0].price;

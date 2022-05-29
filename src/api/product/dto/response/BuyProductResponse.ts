import { Expose, Type } from 'class-transformer';

import { ProductResponse } from './ProductResponse';

export class BuyProductResponse {
  @Expose()
  totalSpent!: number;

  @Expose()
  depositLeft!: number;

  @Expose()
  @Type(() => ProductResponse)
  boughtProducts!: ProductResponse[];
}

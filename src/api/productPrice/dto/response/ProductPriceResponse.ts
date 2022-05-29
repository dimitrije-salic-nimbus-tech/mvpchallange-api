import { Expose } from 'class-transformer';

export class ProductPriceResponse {
  @Expose()
  price!: number;
  @Expose()
  createdAt!: Date;
}

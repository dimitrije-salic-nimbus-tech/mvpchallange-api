import { Expose, Type } from 'class-transformer';

import { UserResponse } from '../../../user/dto/response';

export class ProductResponse {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  amountAvailable!: number;

  @Expose()
  currentPrice!: number;

  @Expose()
  @Type(() => UserResponse)
  seller!: UserResponse;
}

import { Expose, Type } from 'class-transformer';

import { UserResponse } from '../../../user/dto/response';

export class LoginResponse {
  @Expose()
  accesstoken!: string;

  @Expose()
  @Type(() => UserResponse)
  user!: UserResponse;
}

import { Expose } from 'class-transformer';

import { RoleEnum } from '../../../../lib/shared/enums';

export class UserFullResponse {
  @Expose()
  id!: string;

  @Expose()
  username!: string;

  @Expose()
  deposit!: number;

  @Expose()
  role!: RoleEnum;
}

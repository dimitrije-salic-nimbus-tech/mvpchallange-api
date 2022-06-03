import { RoleEnum } from '../../../../lib/shared/enums';

export class CreateUserRequest {
  username!: string;

  role!: RoleEnum;
}

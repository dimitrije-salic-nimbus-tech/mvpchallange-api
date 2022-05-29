import { RoleEnum } from '../../../../lib/enums';

export class CreateUserRequest {
  username!: string;

  role!: RoleEnum;
}

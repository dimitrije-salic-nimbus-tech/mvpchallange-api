import { PermissionActionType } from '../../../../lib/shared/types';
import { Expose } from 'class-transformer';

export class GetUserPermissionsResponse {
  @Expose()
  id!: string;
  @Expose()
  permissions!: PermissionActionType[];
}

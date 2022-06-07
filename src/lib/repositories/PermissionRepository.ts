import { Repository } from 'typeorm';

import { getBaseRepository } from './BaseRepository';
import { PermissionEntity } from '../entities/PermissionEntity';

export const getPermissionRepository = async (): Promise<Repository<PermissionEntity>> => {
  return getBaseRepository().getRepository(PermissionEntity);
};

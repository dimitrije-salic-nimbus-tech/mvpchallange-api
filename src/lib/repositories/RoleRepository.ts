import { Repository } from 'typeorm';

import { getBaseRepository } from './BaseRepository';
import { RoleEntity } from '../entities/RoleEntity';

export const getRoleRepository = async (): Promise<Repository<RoleEntity>> => {
  return getBaseRepository().getRepository(RoleEntity);
};

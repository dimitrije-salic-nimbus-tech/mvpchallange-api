import { Repository } from 'typeorm';

import { UserEntity } from '../entities/UserEntity';
import { getBaseRepository } from './BaseRepository';

export const getUserRepository = async (): Promise<Repository<UserEntity>> => {
  return getBaseRepository().getRepository(UserEntity);
};

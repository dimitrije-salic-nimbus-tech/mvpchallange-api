import { CreateUserRequest } from '../../user/dto/request';
import { getUserRepository } from '../../../lib/repositories';
import { UserAlreadyExistsException } from '../../../lib/exceptions/user';
import { UserEntity } from '../../../lib/entities/UserEntity';
import { mapToClass } from '../../../lib/utils/mapper';

interface IAuthService {
  userRegistration: (request: CreateUserRequest) => Promise<void>;
}

const userRegistration = async (request: CreateUserRequest): Promise<void> => {
  const { username, role } = request;

  const userRepository = await getUserRepository();
  const userExists = await userRepository.findOne({ where: { username } });

  if (userExists) {
    throw new UserAlreadyExistsException();
  }

  const userForCreate: Partial<UserEntity> = mapToClass<UserEntity>({ username, role }, UserEntity);

  return userRepository.save(userForCreate).then(() => Promise.resolve());
};

export const authService: IAuthService = {
  userRegistration,
};

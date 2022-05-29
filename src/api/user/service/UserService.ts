import { CreateUserRequest } from '../dto/request';
import { getUserRepository } from '../../../lib/repositories';
import { UserAlreadyExistsException } from '../../../lib/exceptions/user';
import { mapToClass } from '../../../lib/utils/mapper';
import { UserResponse } from '../dto/response';
import { ResourceNotFoundException } from '../../../lib/exceptions/shared';
import { mapUserEntitiesToUserResponses, mapUserEntityToUserResponse } from '../../../lib/utils/mapper/user';
import { UserEntity } from '../../../lib/entities/UserEntity';
import { UpdateUserRequest } from '../dto/request';
import { PageableItems, PageableRequest } from '../../../lib/dto/pagination';
import { createPageableResponse } from '../../../lib/utils/mapper/pagination';

interface IUserService {
  createUser: (request: CreateUserRequest) => Promise<void>;
  getUser: (id: string) => Promise<UserResponse>; // TODO: move get methods to another service (UserQueryService)
  getUsers: (query: PageableRequest) => Promise<PageableItems<UserResponse>>;
  updateUser: (id: string, request: Partial<UpdateUserRequest>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const createUser = async (request: CreateUserRequest): Promise<void> => {
  const { username, role } = request;

  const userRepository = await getUserRepository();
  const userExists = await userRepository.findOne({ where: { username } });

  if (userExists) {
    throw new UserAlreadyExistsException();
  }

  const userForCreate: Partial<UserEntity> = mapToClass<UserEntity>({ username, role }, UserEntity);

  return userRepository.save(userForCreate).then(() => Promise.resolve());
};

const getUser = async (id: string): Promise<UserResponse> => {
  const userRepository = await getUserRepository();
  const user = await userRepository.findOne({ id });

  if (!user) {
    throw new ResourceNotFoundException();
  }

  return mapUserEntityToUserResponse(user);
};

const getUsers = async (query: PageableRequest): Promise<PageableItems<UserResponse>> => {
  const { offset, limit, page } = query;

  const userRepository = await getUserRepository();
  const [items, count] = await userRepository.createQueryBuilder('user').skip(offset).take(limit).getManyAndCount();

  return createPageableResponse<UserResponse>(mapUserEntitiesToUserResponses(items), limit, count, page);
};

const updateUser = async (id: string, request: Partial<UpdateUserRequest>): Promise<void> => {
  const userRepository = await getUserRepository();

  if (request.username) {
    const user = await userRepository.findOne({ username: request.username });

    if (user) {
      throw new UserAlreadyExistsException();
    }
  }

  return userRepository.update(id, request).then(() => Promise.resolve());
};

const deleteUser = async (id: string): Promise<void> => {
  const userRepository = await getUserRepository();
  return userRepository.delete(id).then(() => Promise.resolve());
};

export const userService: IUserService = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};

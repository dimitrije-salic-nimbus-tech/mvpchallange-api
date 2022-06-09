import { getUserRepository } from '../../../lib/repositories';
import { UserAlreadyExistsException } from '../../../lib/exceptions/user';
import { GetUserPermissionsResponse, UserResponse } from '../dto/response';
import { ResourceNotFoundException } from '../../../lib/exceptions/shared';
import { mapUserEntitiesToUserResponses, mapUserEntityToUserResponse } from '../../../lib/utils/mapper/user';
import { UpdateUserRequest } from '../dto/request';
import { PageableItems, PageableRequest } from '../../../lib/shared/dto/pagination';
import { createPageableResponse } from '../../../lib/utils/mapper/pagination';
import { RolePermissionEntity } from '../../../lib/entities/RolePermissionEntity';
import { PermissionActionType } from '../../../lib/shared/types';

interface IUserService {
  getUser: (id: string) => Promise<UserResponse>; // TODO: move get methods to another service (UserQueryService)
  getUserByUsername: (username: string) => Promise<UserResponse>;
  getUsers: (query: PageableRequest) => Promise<PageableItems<UserResponse>>;
  updateUser: (id: string, request: Partial<UpdateUserRequest>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  getUserPermissions: (username: string) => Promise<GetUserPermissionsResponse>;
}

const getUser = async (id: string): Promise<UserResponse> => {
  const userRepository = await getUserRepository();
  const user = await userRepository.findOne({ id });

  if (!user) {
    throw new ResourceNotFoundException();
  }

  return mapUserEntityToUserResponse(user);
};

const getUserByUsername = async (username: string): Promise<UserResponse> => {
  const userRepository = await getUserRepository();
  const user = await userRepository.findOne({ where: { username } });

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

const getUserPermissions = async (username: string): Promise<GetUserPermissionsResponse> => {
  const userRepository = await getUserRepository();
  const user = await userRepository.findOne({
    where: { username },
    relations: ['role', 'role.rolePermissions', 'role.rolePermissions.permission'],
  });

  if (!user) {
    throw new ResourceNotFoundException();
  }

  const permissions: PermissionActionType[] = user.role.rolePermissions.map(
    (rolePermission: RolePermissionEntity) => rolePermission.permission.permission,
  );

  return {
    id: user.id,
    permissions,
  };
};

export const userService: IUserService = {
  getUser,
  getUserByUsername,
  getUsers,
  updateUser,
  deleteUser,
  getUserPermissions,
};

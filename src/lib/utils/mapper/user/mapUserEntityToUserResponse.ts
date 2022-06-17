import { UserEntity } from '../../../entities/UserEntity';
import { UserFullResponse, UserResponse } from '../../../../api/user/dto/response';
import { mapToClass } from '../ObjectMapper';

export const mapUserEntityToUserResponse = (user: UserEntity): UserResponse =>
  mapToClass<UserResponse>(user, UserResponse);

export const mapUserEntitiesToUserResponses = (users: UserEntity[]): UserResponse[] =>
  users.map(mapUserEntityToUserResponse);

export const mapUserEntityToUserFullResponse = (user: UserEntity): UserFullResponse => {
  const userResponse: UserResponse = mapUserEntityToUserResponse(user);
  return {
    ...userResponse,
    role: user.role.role,
  };
};

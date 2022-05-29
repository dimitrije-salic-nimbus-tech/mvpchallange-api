import { UserEntity } from '../../../entities/UserEntity';
import { UserResponse } from '../../../../api/user/dto/response';
import { mapToClass } from '../ObjectMapper';

export const mapUserEntityToUserResponse = (user: UserEntity): UserResponse =>
  mapToClass<UserResponse>(user, UserResponse);

export const mapUserEntitiesToUserResponses = (users: UserEntity[]): UserResponse[] =>
  users.map(mapUserEntityToUserResponse);

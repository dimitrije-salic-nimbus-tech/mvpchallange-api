import qs from 'qs';
import axios from 'axios';

import { CreateUserRequest } from '../../user/dto/request';
import { getUserRepository } from '../../../lib/repositories';
import { UserAlreadyExistsException } from '../../../lib/exceptions/user';
import { UserEntity } from '../../../lib/entities/UserEntity';
import { mapToClass } from '../../../lib/utils/mapper';
import { cacheService } from './CacheService';
import { CacheKeyEnum } from '../../../lib/shared/enums';
import { userService } from '../../user/service';
import { LoginResponse } from '../dto/response';
import { CognitoException } from '../../../lib/exceptions/cognito';
import { CognitoOauthRequest, CognitoOauthResponse } from '../../../lib/shared/dto/cognito';
import { environment } from '../../../lib/config/env';
import { composeCognitoLogoutUr, composeCognitoOauthUrl } from '../../../lib/utils/cognito';
import { cognitoExpress } from '../../../lib/config/cognito';
import { UnauthorizedException } from '../../../lib/exceptions/shared';
import { UserAlreadyLoggedInException } from '../../../lib/exceptions/auth';
import { UserFullResponse } from '../../user/dto/response';

interface IAuthService {
  userRegistration: (request: CreateUserRequest) => Promise<void>;
  login: (code: string) => Promise<LoginResponse>;
  logout: (id: string) => Promise<void>;
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

const login = async (code: string): Promise<LoginResponse> => {
  if (!code) {
    //unnecessary, already validated with celebrate
    throw new CognitoException();
  }

  const oauthRequest: CognitoOauthRequest = {
    grant_type: 'authorization_code',
    code: code.toString(),
    client_id: environment.cognito.clientId,
    redirect_uri: environment.cognito.redirectUri,
  };
  const oauthResponse: CognitoOauthResponse = await axios({
    method: 'post',
    url: composeCognitoOauthUrl(environment.cognito.domainName, environment.cognito.region),
    data: qs.stringify(oauthRequest),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  }).then((res) => res.data);

  let cognitoValidatedResponse;
  try {
    cognitoValidatedResponse = await cognitoExpress.validate(oauthResponse.access_token);
  } catch (err) {
    throw new UnauthorizedException();
  }
  const { username } = cognitoValidatedResponse;
  const exists = await cacheService.get(`${CacheKeyEnum.USER_SESSION}_${username}`);
  if (exists) {
    throw new UserAlreadyLoggedInException();
  }
  const user: UserFullResponse = await userService.getUserByUsername(username);
  return storeCognitoToken(oauthResponse.access_token, username).then(() => ({
    accesstoken: oauthResponse.access_token,
    user,
  }));
};

const logout = async (username: string): Promise<void> => {
  return cacheService
    .remove(`${CacheKeyEnum.USER_SESSION}_${username}`)
    .then(() =>
      axios
        .get(
          composeCognitoLogoutUr(
            environment.cognito.domainName,
            environment.cognito.clientId,
            environment.cognito.redirectUri,
            environment.cognito.region,
            environment.cognito.responseType,
          ),
        )
        .then(() => Promise.resolve()),
    );
};

export const authService: IAuthService = {
  userRegistration,
  login,
  logout,
};

const storeCognitoToken = (token: string, username: string): Promise<string> =>
  cacheService.store<string>(`${CacheKeyEnum.USER_SESSION}_${username}`, token);

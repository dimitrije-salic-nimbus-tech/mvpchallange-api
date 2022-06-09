import axios from 'axios';
import qs from 'qs';
import { Request } from 'express';

import { environment } from '../../../lib/config/env';
import { composeCognitoOauthUrl, composeCognitoUrl } from '../../../lib/utils/cognito';
import { LoginResponse } from '../dto/response';
import { cacheService } from './CacheService';
import { CacheKeyEnum } from '../../../lib/shared/enums';
import { CognitoOauthRequest, CognitoOauthResponse } from '../../../lib/shared/dto/cognito';
import { CognitoException } from '../../../lib/exceptions/cognito';
import { UnauthorizedException } from '../../../lib/exceptions/shared';
import { cognitoExpress } from '../../../lib/config/cognito';
import { UserAlreadyLoggedInException } from '../../../lib/exceptions/auth';

interface IAuthService {
  getCognitoUrl: () => LoginResponse;
  cognitoRedirect: (req: Request) => Promise<void>;
}

const getCognitoUrl = (): LoginResponse => ({
  cognitoLoginUri: composeCognitoUrl(
    environment.cognito.domainName,
    environment.cognito.clientId,
    environment.cognito.redirectUri,
    environment.cognito.region,
    environment.cognito.responseType,
  ),
});

const cognitoRedirect = async (req: Request): Promise<void> => {
  const { code } = req.query;

  if (!code) {
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
  return storeCognitoToken(oauthResponse.access_token, username).then(() => Promise.resolve());
};

const storeCognitoToken = (token: string, username: string): Promise<string> =>
  cacheService.store<string>(`${CacheKeyEnum.USER_SESSION}_${username}`, token);

export const cognitoService: IAuthService = { getCognitoUrl, cognitoRedirect };

import { environment } from '../../../lib/config/env';
import { composeCognitoUrl } from '../../../lib/utils/cognito';
import { LoginResponse } from '../dto/response';
import { cacheService } from './CacheService';
import { CacheKeyEnum } from '../../../lib/shared/enums';

interface IAuthService {
  getCognitoUrl: () => LoginResponse;
  cognitoRedirect: (req: any) => string;
  storeCognitoToken: (token: string, username: string) => Promise<string>;
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

// @ts-ignore
const cognitoRedirect = (req): string => {
  console.log(123, req);
  return 'success';
};

const storeCognitoToken = (token: string, username: string): Promise<string> =>
  cacheService.store<string>(`${CacheKeyEnum.USER_SESSION}_${username}`, token);

export const cognitoService: IAuthService = { getCognitoUrl, cognitoRedirect, storeCognitoToken };

import { environment } from '../../../lib/config/env';
import { composeCognitoUrl } from '../../../lib/utils/cognito';
import { LoginResponse } from '../dto/response';

interface IAuthService {
  getCognitoUrl: () => LoginResponse;
  cognitoRedirect: (request: any) => string;
}

const getCognitoUrl = (): LoginResponse => ({
  cognitoLoginUri: composeCognitoUrl(
    environment.cognito.domainName,
    environment.cognito.clientId,
    environment.cognito.redirectUri,
  ),
});

const cognitoRedirect = (request: any): string => {
  console.log(123, request); // TODO: extract token and store in redis, create cognito middleware

  return 'success';
};

export const authService: IAuthService = { getCognitoUrl, cognitoRedirect };

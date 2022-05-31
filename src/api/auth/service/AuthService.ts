import { environment } from '../../../lib/config/env';
import { composeCognitoUrl } from '../../../lib/utils/cognito';
import { LoginResponse } from '../dto/response';

interface IAuthService {
  getCognitoUrl: () => LoginResponse;
  cognitoRedirect: () => string;
}

const getCognitoUrl = (): LoginResponse => ({
  cognitoLoginUri: composeCognitoUrl(
    environment.cognito.domainName,
    environment.cognito.clientId,
    environment.cognito.redirectUri,
  ),
});

const cognitoRedirect = (): string => {
  return 'success';
};

export const authService: IAuthService = { getCognitoUrl, cognitoRedirect };

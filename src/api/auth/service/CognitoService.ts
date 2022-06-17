import { environment } from '../../../lib/config/env';
import { composeCognitoUrl } from '../../../lib/utils/cognito';
import { CognitoResponse } from '../dto/response';

interface IAuthService {
  getCognitoUrl: () => CognitoResponse;
}

const getCognitoUrl = (): CognitoResponse => ({
  cognitoLoginUri: composeCognitoUrl(
    environment.cognito.domainName,
    environment.cognito.clientId,
    environment.cognito.redirectUri,
    environment.cognito.region,
    environment.cognito.responseType,
  ),
});

export const cognitoService: IAuthService = { getCognitoUrl };

export const composeCognitoUrl = (
  domainName: string,
  clientId: string,
  redirectUri: string,
  region: string,
  responseType: string,
): string =>
  `https://${domainName}.auth.${region}.amazoncognito.com/login?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}`;

export const composeCognitoOauthUrl = (domainName: string, region: string): string =>
  `https://${domainName}.auth.${region}.amazoncognito.com/oauth2/token`;

export const composeCognitoUrl = (domainName: string, clientId: string, redirectUri: string, region: string): string =>
  `https://${domainName}.auth.${region}.amazoncognito.com/login?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`;

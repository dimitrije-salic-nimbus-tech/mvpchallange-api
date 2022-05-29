export const composeCognitoUrl = (domainName: string, clientId: string, redirectUri: string): string =>
  `https://${domainName}.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`;

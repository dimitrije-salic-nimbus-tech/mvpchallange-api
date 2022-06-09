import { Expose } from 'class-transformer';

export class CognitoResponse {
  @Expose()
  cognitoLoginUri!: string;
}

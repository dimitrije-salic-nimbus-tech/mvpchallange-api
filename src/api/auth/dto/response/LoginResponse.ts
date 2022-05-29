import { Expose } from 'class-transformer';

export class LoginResponse {
  @Expose()
  cognitoLoginUri!: string;
}

import { BaseException } from '../BaseException';
import { BAD_REQUEST, COGNITO_EXCEPTION } from '../../utils/constants';

export class CognitoException extends BaseException {
  constructor() {
    super(BAD_REQUEST, COGNITO_EXCEPTION);

    Object.setPrototypeOf(this, CognitoException.prototype);
  }
}

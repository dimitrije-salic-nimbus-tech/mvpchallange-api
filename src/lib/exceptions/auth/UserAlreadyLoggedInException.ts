import { BaseException } from '../BaseException';
import { BAD_REQUEST, USER_ALREADY_LOGGED_IN } from '../../utils/constants';

export class UserAlreadyLoggedInException extends BaseException {
  constructor() {
    super(BAD_REQUEST, USER_ALREADY_LOGGED_IN);

    Object.setPrototypeOf(this, UserAlreadyLoggedInException.prototype);
  }
}

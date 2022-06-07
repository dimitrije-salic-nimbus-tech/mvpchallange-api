import { BaseException } from '../BaseException';
import { AUTHENTICATION_FAILED, UNAUTHORIZED } from '../../utils/constants';

export class UnauthorizedException extends BaseException {
  constructor() {
    super(UNAUTHORIZED, AUTHENTICATION_FAILED);

    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}

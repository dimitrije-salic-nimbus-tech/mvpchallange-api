import { BaseException } from '../BaseException';
import { METHOD_NOT_ALLOWED, NOT_ALLOWED } from '../../utils/constants';

export class MethodNotAllowedException extends BaseException {
  constructor() {
    super(NOT_ALLOWED, METHOD_NOT_ALLOWED);

    Object.setPrototypeOf(this, MethodNotAllowedException.prototype);
  }
}

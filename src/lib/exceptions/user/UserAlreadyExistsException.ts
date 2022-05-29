import { BaseException } from '../BaseException';
import { BAD_REQUEST, USER_ALREADY_EXISTS } from '../../utils/constants';

export class UserAlreadyExistsException extends BaseException {
  constructor() {
    super(BAD_REQUEST, USER_ALREADY_EXISTS);
  }
}

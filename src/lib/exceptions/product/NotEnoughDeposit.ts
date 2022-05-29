import { BaseException } from '../BaseException';
import { BAD_REQUEST, NOT_ENOUGH_DEPOSIT } from '../../utils/constants';

export class NotEnoughDeposit extends BaseException {
  constructor() {
    super(BAD_REQUEST, NOT_ENOUGH_DEPOSIT);
  }
}

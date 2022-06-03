import { BaseException } from '../BaseException';
import { BAD_REQUEST, NOT_ENOUGH_PRODUCT_AMOUNT } from '../../utils/constants';

export class NotEnoughProductAmount extends BaseException {
  constructor() {
    super(BAD_REQUEST, NOT_ENOUGH_PRODUCT_AMOUNT);

    Object.setPrototypeOf(this, NotEnoughProductAmount.prototype);
  }
}

import { BaseException } from '../BaseException';
import { BAD_REQUEST, INCORRECT_PRICE } from '../../utils/constants';

export class IncorrectPriceValueException extends BaseException {
  constructor() {
    super(BAD_REQUEST, INCORRECT_PRICE);

    Object.setPrototypeOf(this, IncorrectPriceValueException.prototype);
  }
}

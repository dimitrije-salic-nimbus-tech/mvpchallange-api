import { BaseException } from '../BaseException';
import { BAD_REQUEST, PRODUCT_ALREADY_EXISTS } from '../../utils/constants';

export class ProductAlreadyExistsException extends BaseException {
  constructor() {
    super(BAD_REQUEST, PRODUCT_ALREADY_EXISTS);
  }
}

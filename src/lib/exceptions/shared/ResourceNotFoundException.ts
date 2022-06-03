import { BaseException } from '../BaseException';
import { NOT_FOUND, RESOURCE_NOT_FOUND } from '../../utils/constants';

export class ResourceNotFoundException extends BaseException {
  constructor() {
    super(NOT_FOUND, RESOURCE_NOT_FOUND);

    Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
  }
}

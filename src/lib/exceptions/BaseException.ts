export abstract class BaseException extends Error {
  type: string;

  constructor(type: string, message: string) {
    super(message);
    this.type = type;

    Object.setPrototypeOf(this, BaseException.prototype);
  }
}

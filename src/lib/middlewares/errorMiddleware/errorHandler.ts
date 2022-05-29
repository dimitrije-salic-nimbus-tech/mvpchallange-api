import { NextFunction, Request, Response } from 'express';
import { CelebrateError } from 'celebrate';

import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, UNKNOWN_ERROR } from '../../utils/constants';
import { UserAlreadyExistsException } from '../../exceptions/user';
import {
  IncorrectPriceValueException,
  ProductAlreadyExistsException,
  NotEnoughProductAmount,
  NotEnoughDeposit,
} from '../../exceptions/product';
import { ResourceNotFoundException } from '../../exceptions/shared';
import { ErrorResponse } from '../../dto/error';

// @ts-ignore
const isBadRequest = (exception): boolean =>
  exception instanceof UserAlreadyExistsException ||
  exception instanceof ProductAlreadyExistsException ||
  exception instanceof NotEnoughProductAmount ||
  exception instanceof NotEnoughDeposit ||
  exception instanceof IncorrectPriceValueException ||
  exception instanceof CelebrateError;

// @ts-ignore
const isNotFount = (exception): boolean => exception instanceof ResourceNotFoundException;

// @ts-ignore
const createBadRequestError = (exception): ErrorResponse => ({
  httpStatus: BAD_REQUEST,
  message: exception?.message,
});

// @ts-ignore
const createNotFoundError = (exception): ErrorResponse => ({
  httpStatus: NOT_FOUND,
  message: exception?.message,
});

// @ts-ignore
const createInternalServerError = (exception): ErrorResponse => ({
  httpStatus: INTERNAL_SERVER_ERROR,
  message: UNKNOWN_ERROR,
});

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  if (isBadRequest(err)) {
    res.status(400).send(createBadRequestError(err));
    return;
  }

  if (isNotFount(err)) {
    res.status(404).send(createNotFoundError(err));
    return;
  }

  console.log('Unknown error'); // TODO: add logger
  res.status(500).send(createInternalServerError(err));
};

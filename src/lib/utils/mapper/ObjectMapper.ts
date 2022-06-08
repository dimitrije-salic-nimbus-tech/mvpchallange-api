import { plainToClass } from 'class-transformer';
// @ts-ignore
import { ClassType } from 'class-transformer/ClassTransformer';

export const mapToClass = <T>(payload: object, toClass: ClassType<T>): T =>
  plainToClass(toClass, payload, { strategy: 'excludeAll' });

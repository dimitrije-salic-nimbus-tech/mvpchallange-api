import { CacheKeyEnum } from '../../../lib/shared/enums';
import { tryToGetClient } from '../../../lib/config/redis';

interface ICacheService {
  get: <T>(key: CacheKeyEnum | string) => Promise<T>;
  store: <T>(key: CacheKeyEnum | string, item: T) => Promise<T>;
  remove: (key: CacheKeyEnum | string) => Promise<void>;
  exist: (key: CacheKeyEnum | string) => Promise<boolean>;
}

const get = async <T>(key: CacheKeyEnum | string): Promise<T> =>
  new Promise((resolve, reject) => {
    tryToGetClient().get(key, (err, data) => {
      if (err) {
        reject(err);
      }

      // @ts-ignore
      const item = JSON.parse(data) as T;

      resolve(item);
    });
  });

const store = async <T>(key: CacheKeyEnum | string, item: T): Promise<T> => {
  if (await exist(key)) {
    return item;
  }
  return new Promise((resolve, reject) => {
    tryToGetClient().set(key, JSON.stringify(item), (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(item as T);
    });
  });
};

const remove = async (key: CacheKeyEnum | string): Promise<void> => {
  if (!(await exist(key))) {
    return;
  }
  return new Promise((resolve, reject) => {
    tryToGetClient().del(key, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

const exist = async (key: CacheKeyEnum | string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    tryToGetClient().exists(key, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(!!data);
    });
  });
};

export const cacheService: ICacheService = {
  get,
  store,
  remove,
  exist,
};

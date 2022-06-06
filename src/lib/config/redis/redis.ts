import { createClient, RedisClient } from 'redis';
import { environment } from '../env';

let redisClient: RedisClient | null = null;

export const getRedisConnection = (): RedisClient => {
  if (redisClient) {
    return redisClient;
  }
  try {
    return createClient(environment.redis.port, environment.redis.host);
  } catch (err) {
    process.exit(1);
  }
};

export const tryToGetClient = (): RedisClient => {
  if (redisClient) {
    return redisClient;
  }
  return getRedisConnection();
};

import request from 'supertest';

import { getUserRepository } from '../../../src/lib/repositories';
import { mockDatabase } from '../../MockDatabase';
import { RoleEnum } from '../../../src/lib/shared/enums';

const usersUrl: string = '/api/users';

describe('Integration Users', () => {
  describe(`POST ${usersUrl}`, () => {
    beforeEach(async () => {
      const userRepository = await getUserRepository();
      const mockUserTable = userRepository.save({
        id: 'bdff61aa-9be4-4a79-8ebc-7f4a72b49346',
        createdAt: '2022-05-26 07:59:56.253145',
        updatedAt: '2022-05-26 07:59:56.253145',
        username: 'user1',
        deposit: 100,
        role: RoleEnum.BUYER,
      });
      await mockDatabase([mockUserTable]);
    });
    test('should return status 200', async () => {
      // @ts-ignore
      const { app } = global;
      await request(app).patch(usersUrl).send({ username: 'user2', role: RoleEnum.BUYER });
      expect(200);
    });
    test('should return status 400 when user with the same username already exists', async () => {
      // @ts-ignore
      const { app } = global;
      await request(app).patch(usersUrl).send({ username: 'user1', role: RoleEnum.BUYER });
      expect(400);
    });
  });
});

import request from 'supertest';

import { getRoleRepository, getUserRepository } from '../../../src/lib/repositories';
import { RoleEnum } from '../../../src/lib/shared/enums';

const usersUrl: string = '/api/users';

describe(`POST ${usersUrl}`, () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    const userRepository = await getUserRepository();
    const roleRepository = await getRoleRepository();
    const roleId: string = 'c7d8f612-b7c9-46bf-9c9b-8fd2cc978bc6';
    await roleRepository.save({
      id: roleId,
      role: RoleEnum.BUYER,
    });
    await userRepository.save({
      id: 'bdff61aa-9be4-4a79-8ebc-7f4a72b49346',
      createdAt: '2022-05-26 07:59:56.253145',
      updatedAt: '2022-05-26 07:59:56.253145',
      username: 'user1',
      deposit: 100,
      roleId,
    });
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

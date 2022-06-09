import request from 'supertest';

import { getRoleRepository, getUserRepository } from '../../../src/lib/repositories';
import { mockDatabase } from '../../MockDatabase';
import { RoleEnum } from '../../../src/lib/shared/enums';
import { ChangeDepositRequest } from '../../../src/api/user/dto/request';

const addDepositUrl = (userId: string): string => `/api/users/${userId}/add-deposit`;
const id: string = 'bdff61aa-9be4-4a79-8ebc-7f4a72b49346';

describe(`POST ${addDepositUrl(':id')}`, () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    const userRepository = await getUserRepository();
    const roleRepository = await getRoleRepository();
    const roleId: string = 'c7d8f612-b7c9-46bf-9c9b-8fd2cc978bc6';
    const mockRoleTable = roleRepository.save({
      id: roleId,
      role: RoleEnum.BUYER,
    });
    const mockUserTable = userRepository.save({
      id,
      createdAt: '2022-05-26 07:59:56.253145',
      updatedAt: '2022-05-26 07:59:56.253145',
      username: 'user1',
      deposit: 100,
      roleId,
    });
    await mockDatabase([mockRoleTable, mockUserTable]);
  });
  test('should return status 200 when deposit is divisible with 5 and user with forwarded id exists', async () => {
    // @ts-ignore
    const { app } = global;
    await request(app)
      .patch(addDepositUrl(id))
      .send({ deposit: 10 } as ChangeDepositRequest);
    expect(200);
  });
  test('should return status 400 when deposit is not divisible with 5', async () => {
    // @ts-ignore
    const { app } = global;
    await request(app)
      .patch(addDepositUrl(id))
      .send({ deposit: 9 } as ChangeDepositRequest);
    expect(400);
  });
  test('should return status 400 when user with forwarded id does not exist', async () => {
    const randomUuid: string = '141f1ad0-54e7-419a-a37b-ecc55099488f';
    // @ts-ignore
    const { app } = global;
    await request(app)
      .patch(addDepositUrl(randomUuid))
      .send({ deposit: 9 } as ChangeDepositRequest);
    expect(400);
  });
});

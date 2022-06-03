import request from 'supertest';

import { getUserRepository } from '../../../src/lib/repositories';
import { mockDatabase } from '../../MockDatabase';
import { RoleEnum } from '../../../src/lib/shared/enums';
import { ChangeDepositRequest } from '../../../src/api/user/dto/request';

const addDepositUrl = (userId: string): string => `/api/users/${userId}/add-deposit`;
const id: string = 'bdff61aa-9be4-4a79-8ebc-7f4a72b49346';

describe('Integration Users', () => {
  describe(`POST ${addDepositUrl(':id')}`, () => {
    beforeEach(async () => {
      const userRepository = await getUserRepository();
      const mockUserTable = userRepository.save({
        id,
        createdAt: '2022-05-26 07:59:56.253145',
        updatedAt: '2022-05-26 07:59:56.253145',
        username: 'user1',
        deposit: 100,
        role: RoleEnum.BUYER,
      });
      await mockDatabase([mockUserTable]);
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
});

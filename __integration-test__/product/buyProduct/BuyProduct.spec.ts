import request from 'supertest';

import {
  getProductPriceRepository,
  getProductRepository,
  getRoleRepository,
  getUserRepository,
} from '../../../src/lib/repositories';
import { mockDatabase } from '../../MockDatabase';
import { RoleEnum } from '../../../src/lib/shared/enums';
import { BuyProductRequest } from '../../../src/api/product/dto/request';

const buyProductUrl = (id: string): string => `/api/products/buy/${id}/user`;
const buyerId: string = 'bdff61aa-9be4-4a79-8ebc-7f4a72b49346';
const sellerId: string = '815d3334-45d4-4d01-b8cc-f3b412f0f56b';
const productId: string = '141f1ad0-54e7-419a-a37b-ecc55099488f';

describe(`POST ${buyProductUrl(':id')}`, () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    const userRepository = await getUserRepository();
    const roleRepository = await getRoleRepository();
    const buyerRoleId: string = 'c7d8f612-b7c9-46bf-9c9b-8fd2cc978bc6';
    const sellerRoleId: string = '966e02ad-b32c-4306-8070-ca9cbbfe65af';
    const mockRoleTable = roleRepository.save([
      {
        id: buyerRoleId,
        role: RoleEnum.BUYER,
      },
      {
        id: sellerRoleId,
        role: RoleEnum.SELLER,
      },
    ]);
    const mockUserTable = userRepository.save([
      {
        id: buyerId,
        createdAt: '2022-05-26 07:59:56.253145',
        updatedAt: '2022-05-26 07:59:56.253145',
        username: 'user1',
        deposit: 100,
        roleId: buyerRoleId,
      },
      {
        id: sellerId,
        createdAt: '2022-05-26 07:59:56.253145',
        updatedAt: '2022-05-26 07:59:56.253145',
        username: 'user2',
        deposit: 0,
        roleId: sellerRoleId,
      },
    ]);
    const productRepository = await getProductRepository();
    const mockProductTable = productRepository.save({
      id: productId,
      createdAt: '2022-05-26 07:59:56.253145',
      updatedAt: '2022-05-26 07:59:56.253145',
      name: 'product1',
      amountAvailable: 10,
      sellerId,
    });
    const productPriceRepository = await getProductPriceRepository();
    const mockProductPriceTable = productPriceRepository.save({
      id: '99e9d191-8bf5-4f55-9661-801daed0d11c',
      createdAt: '2022-05-26 07:59:56.253145',
      updatedAt: '2022-05-26 07:59:56.253145',
      price: 10,
      productId,
    });

    await mockDatabase([mockRoleTable, mockUserTable, mockProductTable, mockProductPriceTable]);
  });
  test('should return status 200', async () => {
    // @ts-ignore
    const { app } = global;
    await request(app)
      .get(buyProductUrl(buyerId))
      .send({
        products: [
          {
            productId,
            amount: 2,
          },
        ],
      } as BuyProductRequest);
    expect(200);
  });
  test('should return status 400 when there is no enough products available', async () => {
    // @ts-ignore
    const { app } = global;
    await request(app)
      .patch(buyProductUrl(buyerId))
      .send({
        products: [
          {
            productId,
            amount: 11,
          },
        ],
      } as BuyProductRequest);
    expect(400);
  });
  test('should return status 400 when product with forwarded id does not exist', async () => {
    const randomUuid: string = 'c627b266-03d0-4808-988a-2a6e73d7a223';
    // @ts-ignore
    const { app } = global;
    await request(app)
      .patch(buyProductUrl(buyerId))
      .send({
        products: [
          {
            productId: randomUuid,
            amount: 11,
          },
        ],
      } as BuyProductRequest);
    expect(400);
  });
  test('should return status 400 when user with forwarded id does not exist', async () => {
    const randomUuid: string = 'c627b266-03d0-4808-988a-2a6e73d7a223';
    // @ts-ignore
    const { app } = global;
    await request(app)
      .patch(buyProductUrl(randomUuid))
      .send({
        products: [
          {
            productId,
            amount: 11,
          },
        ],
      } as BuyProductRequest);
    expect(400);
  });
});

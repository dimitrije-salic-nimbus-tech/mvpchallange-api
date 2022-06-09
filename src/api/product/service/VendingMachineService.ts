import { BuyProductRequest } from '../dto/request';
import { UserResponse } from '../../user/dto/response';
import { userDepositService, userService } from '../../user/service';
import { ResourceNotFoundException } from '../../../lib/exceptions/shared';
import { getProductRepository } from '../../../lib/repositories';
import { getCurrentPrice, mapProductEntitiesToProductResponses } from '../../../lib/utils/mapper/product';
import { NotEnoughProductAmount, NotEnoughDeposit } from '../../../lib/exceptions/product';
import { ProductEntity } from '../../../lib/entities/ProductEntity';
import { ProductPriceEntity } from '../../../lib/entities/ProductPriceEntity';
import { BuyProductResponse } from '../dto/response';

interface IVendingMachineService {
  buyProduct: (id: string, request: BuyProductRequest) => Promise<BuyProductResponse>;
}

const buyProduct = async (id: string, request: BuyProductRequest): Promise<BuyProductResponse> => {
  const productRepository = await getProductRepository();
  const user: UserResponse = await userService.getUser(id);

  let totalSpent: number = 0;
  let depositLeft: number = user.deposit;

  // Not able to use Promise.all(stream) because of user's deposit
  // Transactions should be implemented to revert db changes if eventually exception is thrown due to lack of deposit/amount
  for (let i = 0; i < request.products.length; i++) {
    const { productId, amount } = request.products[i];
    const product = await productRepository.findOne({ where: { id: productId }, relations: ['prices'] });
    if (!product) {
      throw new ResourceNotFoundException();
    }

    const amountAvailable: number = getAmountAvailable(product.amountAvailable, amount);

    const price: number = getPrice(amount, product.prices, depositLeft);
    totalSpent += price;
    depositLeft -= price;

    await Promise.all([
      userDepositService.changeDeposit(id, {
        deposit: -price,
      }),
      productRepository.update(productId, { amountAvailable }),
    ]);
  }

  const products: ProductEntity[] = await Promise.all(
    request.products.map((req) =>
      productRepository.findOneOrFail({ where: { id: req.productId }, relations: ['prices', 'seller'] }),
    ),
  );

  return {
    totalSpent,
    depositLeft,
    boughtProducts: mapProductEntitiesToProductResponses(products),
  };
};

export const vendingMachineService: IVendingMachineService = {
  buyProduct,
};

const getAmountAvailable = (productCurrentAmount: number, amount: number): number => {
  const amountAvailable: number = productCurrentAmount - amount;
  if (amountAvailable < 0) {
    throw new NotEnoughProductAmount();
  }
  return amountAvailable;
};

const getPrice = (amount: number, prices: ProductPriceEntity[], currentDeposit: number): number => {
  const price: number = amount * getCurrentPrice(prices);
  if (currentDeposit < price) {
    throw new NotEnoughDeposit();
  }
  return price;
};

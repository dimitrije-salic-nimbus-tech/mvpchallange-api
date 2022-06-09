import { CreateProductRequest, UpdateProductRequest } from '../dto/request';
import { getProductRepository } from '../../../lib/repositories';
import { ProductAlreadyExistsException } from '../../../lib/exceptions/product';
import { ProductEntity } from '../../../lib/entities/ProductEntity';
import { mapToClass } from '../../../lib/utils/mapper';
import { userService } from '../../user/service';
import { productPriceService } from './ProductPriceService';
import { UserResponse } from '../../user/dto/response';
import { ProductResponse } from '../dto/response';
import {
  getCurrentPrice,
  mapProductEntitiesToProductResponses,
  mapProductEntityToProductResponse,
} from '../../../lib/utils/mapper/product';
import { ResourceNotFoundException } from '../../../lib/exceptions/shared';
import { PageableItems, PageableRequest } from '../../../lib/shared/dto/pagination';
import { createPageableResponse } from '../../../lib/utils/mapper/pagination';
import { IncorrectPriceValueException } from '../../../lib/exceptions/product';

interface IProductService {
  createProduct: (userId: string, request: CreateProductRequest) => Promise<void>;
  getProduct: (id: string) => Promise<ProductResponse>; // TODO: move get methods to query service (ProductQueryService)
  getProducts: (query: PageableRequest) => Promise<PageableItems<ProductResponse>>;
  updateProduct: (id: string, request: UpdateProductRequest) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const createProduct = async (userId: string, request: CreateProductRequest): Promise<void> => {
  const { name, price, amountAvailable } = request;

  if (price % 5 !== 0) {
    throw new IncorrectPriceValueException();
  }

  const productRepository = await getProductRepository();

  const productExists = await productRepository.findOne({ where: { name } });

  if (productExists) {
    throw new ProductAlreadyExistsException();
  }

  const seller: UserResponse = await userService.getUser(userId);

  const productForCreate: Partial<ProductEntity> = mapToClass<ProductEntity>(
    { name, amountAvailable, sellerId: seller.id },
    ProductEntity,
  );
  return productRepository
    .save(productForCreate)
    .then((product: ProductEntity) => productPriceService.createProductPrice(price, product));
};

const getProduct = async (id: string): Promise<ProductResponse> => {
  const productRepository = await getProductRepository();

  const product = await productRepository.findOne({ where: { id }, relations: ['seller', 'prices'] });

  if (!product) {
    throw new ResourceNotFoundException();
  }

  return mapProductEntityToProductResponse(product);
};

const getProducts = async (query: PageableRequest): Promise<PageableItems<ProductResponse>> => {
  const { offset, limit, page } = query;

  const productRepository = await getProductRepository();

  const [items, count] = await productRepository
    .createQueryBuilder('product')
    .leftJoinAndSelect('product.prices', 'prices')
    .leftJoinAndSelect('product.seller', 'seller')
    .skip(offset)
    .take(limit)
    .getManyAndCount();

  return createPageableResponse<ProductResponse>(mapProductEntitiesToProductResponses(items), limit, count, page);
};

const updateProduct = async (id: string, request: Partial<UpdateProductRequest>): Promise<void> => {
  const productRepository = await getProductRepository();

  const product = await productRepository.findOne({ where: { id }, relations: ['prices'] });
  if (!product) {
    throw new ResourceNotFoundException();
  }

  if (request.name) {
    const productExists = await productRepository.findOne({ where: { name: request.name } });

    if (productExists) {
      throw new ProductAlreadyExistsException();
    }

    await productRepository.update(id, { name: request.name });
  }

  if (request.price) {
    if (request.price < 0 || request.price === getCurrentPrice(product.prices)) {
      throw new IncorrectPriceValueException(); // TODO: use decorator
    }
    await productPriceService.createProductPrice(request.price, product);
  }

  return Promise.resolve();
};

const deleteProduct = async (id: string): Promise<void> => {
  const productRepository = await getProductRepository();
  return productRepository.delete(id).then(() => Promise.resolve());
};

export const productService: IProductService = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};

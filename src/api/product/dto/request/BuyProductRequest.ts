export class BuyProductRequest {
  products!: {
    productId: string;

    amount: number;
  }[];
}

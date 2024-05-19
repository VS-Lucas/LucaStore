import { IProduct } from "./Cart";

export interface IProductWithQuantity extends IProduct {
  quantity: number;
}

export interface IGroupedCart {
  [category: string]: {
    [id: string]: IProductWithQuantity;
  };
}

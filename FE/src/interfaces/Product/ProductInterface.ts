import { ProductStatInterface } from "./ProductStatInterface";

export interface ProductInterface {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
  stat: ProductStatInterface;
}

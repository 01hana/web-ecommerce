export interface Product {
  id: number;
  name: string;
  price: number | string;
  image: string | undefined;
}

export interface CartProduct {
  id: number;
  uid?: string;
  name: string;
  price: number | string;
  image: string | undefined;
  quantity: number;
  size: string;
  color: string;
}

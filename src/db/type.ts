import { Generated } from 'kysely';

export type Product = {
  id: Generated<number>;
  name: string;
  price: string;
  categoryId: number;
};

export type Category = {
  id: Generated<number>;
  name: string;
};

export type Database = {
  product: Product;
  category: Category;
};

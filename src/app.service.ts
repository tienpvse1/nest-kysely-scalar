import { Injectable } from '@nestjs/common';
import { db } from './db/connection';
import { CreateProductDto } from './models/create-product.dto';

@Injectable()
export class AppService {
  getProducts() {
    return db.selectFrom('product').selectAll().execute();
  }

  createProduct(dto: CreateProductDto) {
    return db.insertInto('product').values(dto).returningAll().execute();
  }

  getProductById(id: number) {
    return db
      .selectFrom('product')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirstOrThrow();
  }

  createCategory(name: string) {
    return db.insertInto('category').values({ name }).returningAll().execute();
  }

  statProductInCategory() {
    return db
      .selectFrom('product')
      .select((eb) => {
        return [
          'id',
          'name',
          'price',
          'categoryId',
          eb.fn
            .agg('rank')
            .over((expression) =>
              expression.orderBy('price', 'desc').partitionBy('categoryId'),
            )
            .as('priceRank'),
        ];
      })
      .orderBy('categoryId')
      .orderBy('priceRank')
      .execute();
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCategoryDto } from './models/create-category.dto';
import { CreateProductDto } from './models/create-product.dto';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post('create-product')
  createProduct(@Body() dto: CreateProductDto) {
    return this.service.createProduct(dto);
  }

  @Post('create-category')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.service.createCategory(dto.name);
  }

  @Get('products')
  getProducts() {
    return this.service.getProducts();
  }

  @Get('product/:id')
  getProductById(@Param('id', new ParseIntPipe()) id: number) {
    return this.service.getProductById(id);
  }

  @Get('product-stats')
  statProductInCategory() {
    return this.service.statProductInCategory();
  }
}

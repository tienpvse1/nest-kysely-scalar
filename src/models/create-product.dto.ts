import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ default: 'product #1' })
  name: string;
  @ApiProperty({ type: 'bigint', default: '10000' })
  price: string;
  @ApiProperty({ type: 'int' })
  categoryId: number;
}

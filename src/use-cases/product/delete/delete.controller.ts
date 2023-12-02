import { Controller, Delete, HttpCode, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from '@infra/db/product/product.service';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class DeleteController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Delete(':id')
  @HttpCode(204)
  async execute(@Param('id') id: string): Promise<void> {
    const result = await this.productService.delete(id);
    return result;
  }
}

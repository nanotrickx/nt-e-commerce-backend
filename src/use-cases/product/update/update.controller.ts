import { Body, Controller, HttpCode, Put, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProductMapper } from './update-mapper';
import { UpdateProductRequest } from './update-request';
import { ProductService } from '@infra/db/product/product.service';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class UpdateProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly mapper: UpdateProductMapper
  ) {}

  @Put(':id')
  @HttpCode(204)
  async execute(@Param('id') id: string, @Body() body: UpdateProductRequest): Promise<void> {
    const product = this.mapper.mapToUpdateProductRequest(body);
    const result = this.productService.updateById(id, product, null);
    return result;
  }
}

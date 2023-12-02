import { Controller, Delete, HttpCode, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductVariantService } from '@infra/db/product-variant/product-variant.service';

@ApiTags('product-variants')
@ApiBearerAuth()
@Controller('product-variants')
export class DeleteProductVariantController {
  constructor(
    private readonly productVariantService: ProductVariantService,
  ) {}

  @Delete(':id')
  @HttpCode(204)
  async execute(@Param('id') id: string): Promise<void> {
    const result = this.productVariantService.delete(id);
    return result;
  }
}

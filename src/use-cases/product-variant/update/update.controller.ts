import { Body, Controller, HttpCode, Put, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProductVariantMapper } from './update-mapper';
import { UpdateProductVariantRequest } from './update-request';
import { ProductVariantService } from '@infra/db/product-variant/product-variant.service';

@ApiTags('product-variants')
@ApiBearerAuth()
@Controller('product-variants')
export class UpdateProductVariantController {
  constructor(
    private readonly productVariantService: ProductVariantService,
    private readonly mapper: UpdateProductVariantMapper
  ) {}

  @Put(':id')
  @HttpCode(204)
  async execute(@Param('id') id: string, @Body() body: UpdateProductVariantRequest): Promise<void> {
    const result = null;
  }
}

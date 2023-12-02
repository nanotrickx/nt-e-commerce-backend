import { Controller, Delete, HttpCode, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductImageService } from '@infra/db/product-image/product-image.service';

@ApiTags('product-images')
@ApiBearerAuth()
@Controller('product-images')
export class DeleteProductImageController {
  constructor(
    private readonly productImageService: ProductImageService,
  ) {}

  @Delete(':id')
  @HttpCode(204)
  async execute(@Param('id') id: string): Promise<void> {
    const result =await this.productImageService.delete(id);
    return result;
  }
}

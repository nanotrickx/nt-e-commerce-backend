import { Body, Controller, HttpCode, Put, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProductImageMapper } from './update-mapper';
import { UpdateProductImageRequest } from './update-request';
import { ProductImageService } from '@infra/db/product-image/product-image.service';

@ApiTags('product-images')
@ApiBearerAuth()
@Controller('product-images')
export class UpdateProductImageController {
  constructor(
    private readonly productImageService: ProductImageService,
    private readonly mapper: UpdateProductImageMapper
  ) {}

  @Put(':id')
  @HttpCode(204)
  async execute(@Param('id') id: string, @Body() body: UpdateProductImageRequest): Promise<void> {
    const result = null;
  }
}

import { Body, Controller,HttpCode, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductImageMapper } from './create-mapper';
import { CreateProductImageRequest } from './create-request';
import { CreateProductImageResponse } from './create-response';
import { ProductImageService } from '@infra/db/product-image/product-image.service';
import { UnitOfWorkService } from '@infra/db/unit-of-work.service';

@ApiTags('product-images')
@ApiBearerAuth()
@Controller('product-images')
export class CreateProductImageController {
  constructor(
    private readonly ProductImageService: ProductImageService,
    private readonly mapper: CreateProductImageMapper,
    private readonly unitOfWorkService: UnitOfWorkService
  ) {}

  @Post()
  @HttpCode(201)
  async execute(@Body() body: CreateProductImageRequest): Promise<CreateProductImageResponse> {
    const response = await this.unitOfWorkService.withRetrySession(async (session: any) => {
      const ProductImage = this.mapper.mapToCreateProductImageRequest(body);
      const result= await this.ProductImageService.insert(ProductImage, session);
      if(result){
        const response = this.mapper.mapToCreateProductImageResponse(result[0]);
        return response;
      }
    });
    return response;
  }
}

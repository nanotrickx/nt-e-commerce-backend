import { Body, Controller,HttpCode, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductVariantMapper } from './create-mapper';
import { CreateProductVariantRequest } from './create-request';
import { CreateProductVariantResponse } from './create-response';
import { ProductVariantService } from '@infra/db/product-variant/product-variant.service';
import { UnitOfWorkService } from '@infra/db/unit-of-work.service';

@ApiTags('product-variants')
@ApiBearerAuth()
@Controller('product-variants')
export class CreateProductVariantController {
  constructor(
    private readonly ProductVariantService: ProductVariantService,
    private readonly mapper: CreateProductVariantMapper,
    private readonly unitOfWorkService: UnitOfWorkService
  ) {}

  @Post()
  @HttpCode(201)
  async execute(@Body() body: CreateProductVariantRequest): Promise<CreateProductVariantResponse> {
    const response = await this.unitOfWorkService.withRetrySession(async (session: any) => {
      const ProductVariant = this.mapper.mapToCreateProductVariantRequest(body);
      const result= await this.ProductVariantService.insert(ProductVariant, session);
      if(result){
        const response = this.mapper.mapToCreateProductVariantResponse(result[0]);
        return response;
      }
    });
    return response;
  }
}

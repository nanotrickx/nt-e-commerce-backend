import { Body, Controller,HttpCode, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductMapper } from './create-mapper';
import { CreateProductRequest } from './create-request';
import { CreateProductResponse } from './create-response';
import { ProductService } from '@infra/db/product/product.service';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class CreateProductController {
  constructor(
    private readonly ProductService: ProductService,
    private readonly mapper: CreateProductMapper
  ) {}

  @Post()
  @HttpCode(201)
  async execute(@Body() body: CreateProductRequest): Promise<CreateProductResponse> {
      const Product = this.mapper.mapToCreateProductRequest(body);
      const result= await this.ProductService.insert(Product, null);
      if(result){
        const response = this.mapper.mapToCreateProductResponse(result[0]);
        return response;
      }
  }
}

import { Controller, Get, HttpCode,Param, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetProductVariantMapper } from './get-mapper';
import { GetProductVariantRequest } from './get-request';
import { ProductVariantService } from '@infra/db/product-variant/product-variant.service';

@ApiTags('product-variants')
@ApiBearerAuth()
@Controller('product-variants')
export class GetProductVariantController {
  constructor(
    private readonly productVariantService: ProductVariantService,
    private readonly mapper: GetProductVariantMapper
  ) {}

  @Get(':id')
  @HttpCode(200)
  async execute(@Param('id') id: string, @Query() query: GetProductVariantRequest): Promise<any> {
    try{
      const result = await this.productVariantService.findById(id);
      if(result){
        const response = this.mapper.mapToProductVariantResponse(result);
        return response;
      }else{
        throw new NotFoundException("Record Not Found");
      }
      
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}

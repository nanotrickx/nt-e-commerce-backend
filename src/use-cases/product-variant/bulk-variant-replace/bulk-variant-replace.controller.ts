import { Body, Controller, HttpCode, Put, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BulkVariantReplaceProductVariantMapper } from './bulk-variant-replace-mapper';
import { BulkVariantReplaceProductVariantRequest } from './bulk-variant-replace-request';
import { ProductVariantService } from '@infra/db/product-variant/product-variant.service';

@ApiTags('product-variants')
@ApiBearerAuth()
@Controller('bulk-create-product-variants')
export class BulkVariantReplaceProductVariantController {
  constructor(
    private readonly productVariantService: ProductVariantService,
    private readonly mapper: BulkVariantReplaceProductVariantMapper
  ) {}

  @Put('')
  @HttpCode(204)
  async execute(@Body() body: BulkVariantReplaceProductVariantRequest): Promise<any> {
    
    // if(body.productId){
    //   if(body.isReplace == true){
    //     await this.productVariantService.deleteMany(body.productId)
    //   }
    // }
    const dataArray = this.mapper.mapToBulkVariantReplaceProductVariantRequest(body);
    for(let item of dataArray){
      let filter = {
        option: item.option,
        product_id: item.product_id
      };
      await this.productVariantService.insertOrUpdateOne(filter, item)
    }
    
    const result =await this.productVariantService.findAll({filter: {product_id: body.productId}});
    return result;
  }
}

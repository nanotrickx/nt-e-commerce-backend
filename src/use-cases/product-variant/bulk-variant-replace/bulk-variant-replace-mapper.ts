import { ProductVariant } from '@infra/db/product-variant/product-variant.schema';
import { BulkVariantReplaceProductVariantRequest } from './bulk-variant-replace-request';
import { BulkVariantReplaceProductVariantResponse } from './bulk-variant-replace-response';
import { Types } from 'mongoose';

export class BulkVariantReplaceProductVariantMapper {
  public mapToBulkVariantReplaceProductVariantRequest(request: BulkVariantReplaceProductVariantRequest): Partial<ProductVariant>[]{
    
    let response: Partial<ProductVariant>[]= [];
    for(let source of request.data){
      let obj = {
        product_id:  new Types.ObjectId(source.product_id),
        title: source.title,
        barcode: source.barcode,
        fulfillment_service: source.fulfillment_service,
        grams: source.grams,
        image_id: source.image_id,
        inventory_item_id: source.inventory_item_id,
        inventory_management: source.inventory_management,
        inventory_policy: source.inventory_policy,
        inventory_quantity: source.inventory_quantity,
        option: source.option,
        presentment_prices: source.presentment_prices,
        position: source.position,
        requires_shipping: source.requires_shipping,
        sku: source.sku,
        taxable: source.taxable,
        tax_code: source.tax_code,
        weight: source.weight,
        weight_unit: source.weight_unit
      };
      response.push(obj)
    }
    return response;
  }

  public mapToBulkVariantReplaceProductVariantResponse(source: ProductVariant): BulkVariantReplaceProductVariantResponse {
    const response: BulkVariantReplaceProductVariantResponse = {
      
    };
    return response;
  }
}

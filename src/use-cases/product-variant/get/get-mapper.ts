import { ProductVariant } from '@infra/db/product-variant/product-variant.schema';
import { PagedModel } from '@infra/db/helper';
import { GetProductVariantResponse } from './get-response';

export class GetProductVariantMapper {
  public mapToProductVariantResponse(source: ProductVariant): GetProductVariantResponse {
    const response: GetProductVariantResponse = {
      id: source.id,
      product_id:  source.product_id.toString(),
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
    return response;
  }
}

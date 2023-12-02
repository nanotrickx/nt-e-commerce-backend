import { SortingDirection } from '@common/sorting-direction';
import { ProductVariant } from '@infra/db/product-variant/product-variant.schema';
import { PagedModel } from '@infra/db/helper';
import { GetListProductVariantResponse } from './get-list-response';

export class GetListProductVariantMapper {
  public mapToProductVariantResponse(request: PagedModel<ProductVariant>): GetListProductVariantResponse {
    const response: GetListProductVariantResponse = {
      orderByPropertyName: request.orderByPropertyName,
      sortingDirection: SortingDirection.Ascending,
      pageNumber: request.pageNumber,
      pageSize: request.pageSize,
      totalCount: request.totalCount,
      totalPages: request.totalPages,
      items: request.items.map((x) => {
        return {
          id:x.id,
          product_id:  x.product_id.toString(),
          title: x.title,
          barcode: x.barcode,
          fulfillment_service: x.fulfillment_service,
          grams: x.grams,
          image_id: x.image_id,
          inventory_item_id: x.inventory_item_id,
          inventory_management: x.inventory_management,
          inventory_policy: x.inventory_policy,
          inventory_quantity: x.inventory_quantity,
          option: x.option,
          presentment_prices: x.presentment_prices,
          position: x.position,
          requires_shipping: x.requires_shipping,
          sku: x.sku,
          taxable: x.taxable,
          tax_code: x.tax_code,
          weight: x.weight,
          weight_unit: x.weight_unit,
          createdAt: x.created_at,
          createdBy: x.created_by,
          updatedAt: x.modified_at,
          updatedBy: x.modified_by
        };
      })
    };
    return response;
  }
}

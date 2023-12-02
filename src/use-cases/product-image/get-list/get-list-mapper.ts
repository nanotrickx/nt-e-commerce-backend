import { SortingDirection } from '@common/sorting-direction';
import { ProductImage } from '@infra/db/product-image/product-image.schema';
import { PagedModel } from '@infra/db/helper';
import { GetListProductImageResponse } from './get-list-response';
import { GetListProductImageRequest } from './get-list-request';

export class GetListProductImageMapper {
  public mapToProductImageRequest(request: GetListProductImageRequest): GetListProductImageRequest {
    const response: GetListProductImageRequest = {
      pageNumber: request.pageNumber,
      pageSize: request.pageSize,
      sortingDirection: request.sortingDirection,
      orderByPropertyName: request.orderByPropertyName,
      productId: request.productId
    }
    return response;
  }

  public mapToProductImageResponse(request: PagedModel<ProductImage & {s3path: string}>): GetListProductImageResponse {
    const response: GetListProductImageResponse = {
      orderByPropertyName: request.orderByPropertyName,
      sortingDirection: SortingDirection.Ascending,
      pageNumber: request.pageNumber,
      pageSize: request.pageSize,
      totalCount: request.totalCount,
      totalPages: request.totalPages,
      items: request.items.map((x) => {
        return {
          id:x.id,
          product_id: x.product_id.toString(),
          position: x.position,
          alt: x.alt,
          width: x.width,
          height: x.height,
          src: x.src,
          s3path: x.s3path,
          created_at: x.created_at,
          created_by: x.created_by,
          updated_at: x.modified_at,
          modified_by: x.modified_by
        };
      })
    };
    return response;
  }
}

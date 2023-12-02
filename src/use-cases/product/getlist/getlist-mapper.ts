import { SortingDirection } from '@common/sorting-direction';
import { Product } from '@infra/db/product/product.schema';
import { PagedModel } from '@infra/db/helper';
import { GetlistProductResponse } from './getlist-response';

export class GetlistProductMapper {
  public mapToProductResponse(request: PagedModel<Product>): GetlistProductResponse {
    const response: GetlistProductResponse = {
      orderByPropertyName: request.orderByPropertyName,
      sortingDirection: SortingDirection.Ascending,
      pageNumber: request.pageNumber,
      pageSize: request.pageSize,
      totalCount: request.totalCount,
      totalPages: request.totalPages,
      items: request.items.map((x) => {
        return {
          id:x.id,
          title: x.title,
          description: x.description,
          body: x.body,
          slug: x.slug,
          options: x.options,
          product_type: x.product_type,
          published_scope: x.published_scope,
          images: x.images,
          variants: x.variants,
          tags: x.tags,
          vendor: x.vendor,
          status: x.status,
          published_at: x.published_at,
          createdAt: x.created_at,
          createdBy: x.created_by,
          updatedAt: x.updated_at,
          updatedBy: x.modified_by
        };
      })
    };
    return response;
  }
}

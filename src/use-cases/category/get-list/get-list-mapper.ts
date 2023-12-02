import { SortingDirection } from '@common/sorting-direction';
import { Category } from '@infra/db/category/category.schema';
import { PagedModel } from '@infra/db/helper';
import { GetListCategoryResponse } from './get-list-response';

export class GetListCategoryMapper {
  public mapToCategoryResponse(request: PagedModel<any>): GetListCategoryResponse {
    const response: GetListCategoryResponse = {
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
          slug: x.slug,
          description: x.description,
          imgSrc: x.imgSrc,
          imgUrl: x.imgUrl,
          isMenu: x.isMenu,
          status: x.status,
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

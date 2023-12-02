import { Category } from '@infra/db/category/category.schema';
import { PagedModel } from '@infra/db/helper';
import { GetCategoryResponse } from './get-response';

export class GetCategoryMapper {
  public mapToCategoryResponse(source: Category): GetCategoryResponse {
    const response: GetCategoryResponse = {
      id: source.id,
      title: source.title,
      slug: source.slug,
      description: source.description,
      imgSrc: source.imgSrc,
      isMenu: source.isMenu,
      status: source.status
    };
    return response;
  }
}

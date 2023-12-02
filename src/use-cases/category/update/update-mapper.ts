import { Category } from '@infra/db/category/category.schema';
import { UpdateCategoryRequest } from './update-request';
import { UpdateCategoryResponse } from './update-response';

export class UpdateCategoryMapper {
  public mapToUpdateCategoryRequest(source: UpdateCategoryRequest): Partial<Category>{
    const response: Partial<Category> = {
      title: source.title,
      description: source.description,
      imgSrc: source.imgSrc,
      isMenu: source.isMenu,
      status: source.status
    };
    return response;
  }

  public mapToUpdateCategoryResponse(source: Category): UpdateCategoryResponse {
    const response: UpdateCategoryResponse = {
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

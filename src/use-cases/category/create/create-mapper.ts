import { Category } from '@infra/db/category/category.schema';
import { CreateCategoryRequest } from './create-request';
import { CreateCategoryResponse } from './create-response';

export class CreateCategoryMapper {
  public mapToCreateCategoryRequest(source: CreateCategoryRequest): Partial<Category>{
    const response: Partial<Category> = {
      title: source.title,
      slug: source.slug,
      description: source.description,
      imgSrc: source.imgSrc,
      isMenu: source.isMenu,
      status: source.status
    };
    return response;
  }

  public mapToCreateCategoryResponse(source: Category): CreateCategoryResponse {
    const response: CreateCategoryResponse = {
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

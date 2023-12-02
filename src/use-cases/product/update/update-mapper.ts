import { Product } from '@infra/db/product/product.schema';
import { UpdateProductRequest } from './update-request';
import { UpdateProductResponse } from './update-response';

export class UpdateProductMapper {
  public mapToUpdateProductRequest(source: UpdateProductRequest): Partial<Product>{
    const response: Partial<Product> = {
      title: source.title,
      description: source.description,
      body: source.body,
      options: source.options,
      product_type: source.product_type,
      published_scope: source.published_scope,
      tags: source.tags,
      vendor: source.vendor,
      status: source.status
    };
    return response;
  }

  public mapToUpdateProductResponse(source: Product): UpdateProductResponse {
    const response: UpdateProductResponse = {
      id: source.id,
      title: source.title,
      description: source.description,
      body: source.body,
      slug: source.slug,
      product_type: source.product_type,
      published_scope: source.published_scope,
      tags: source.tags,
      vendor: source.vendor,
      status: source.status,
      published_at: source.published_at,
      created_at: source.created_at,
      updated_at: source.updated_at
    };
    return response;
  }
}

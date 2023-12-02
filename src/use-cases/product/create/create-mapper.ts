import { Product } from '@infra/db/product/product.schema';
import { CreateProductRequest } from './create-request';
import { CreateProductResponse } from './create-response';

export class CreateProductMapper {
  public mapToCreateProductRequest(source: CreateProductRequest): Partial<Product>{
    const response: Partial<Product> = {
      title: source.title,
      description: source.description,
      body: source.body,
      slug: source.slug,
      options: source.options,
      product_type: source.product_type,
      published_scope: source.published_scope,
      tags: source.tags,
      vendor: source.vendor,
      status: source.status
    };
    if(source.status === "ACTIVE"){
      response.published_at = new Date().toISOString();
    }
    return response;
  }

  public mapToCreateProductResponse(source: Product): CreateProductResponse {
    const response: CreateProductResponse = {
      id: source.id,
      title: source.title,
      description: source.description,
      body: source.body,
      slug: source.slug,
      options: source.options,
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

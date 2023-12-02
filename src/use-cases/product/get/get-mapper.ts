import { Product } from '@infra/db/product/product.schema';
import { PagedModel } from '@infra/db/helper';
import { GetProductResponse } from './get-response';

export class GetProductMapper {
  public mapToProductResponse(source: Product): GetProductResponse {
    const response: GetProductResponse = {
      id: source.id,
      title: source.title,
      body: source.body,
      description: source.description,
      slug: source.slug,
      image: source.image,
      images: source.images,
      options: source.options,
      product_type: source.product_type,
      published_scope: source.published_scope,
      tags: source.tags,
      vendor: source.vendor,
      variants: source.variants,
      status: source.status,
      published_at: source.published_at,
      created_at: source.created_at,
      updated_at: source.updated_at
    };
    return response;
  }
}

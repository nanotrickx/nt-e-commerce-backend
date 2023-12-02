import { ProductImage } from '@infra/db/product-image/product-image.schema';
import { PagedModel } from '@infra/db/helper';
import { GetProductImageResponse } from './get-response';

export class GetProductImageMapper {
  public mapToProductImageResponse(source: ProductImage): GetProductImageResponse {
    const response: GetProductImageResponse = {
      id: source.id,
      product_id: source.product_id.toString(),
      position: source.position,
      alt: source.alt,
      width: source.width,
      height: source.height,
      src: source.src
    };
    return response;
  }
}

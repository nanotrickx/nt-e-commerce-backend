import { ProductImage } from '@infra/db/product-image/product-image.schema';
import { Types } from 'mongoose';
import { CreateProductImageRequest } from './create-request';
import { CreateProductImageResponse } from './create-response';

export class CreateProductImageMapper {
  public mapToCreateProductImageRequest(source: CreateProductImageRequest): Partial<ProductImage>{
    const response: Partial<ProductImage> = {
      product_id:  new Types.ObjectId(source.product_id),
      position: source.position,
      alt: source.alt,
      width: source.width,
      height: source.height,
      src: source.src
    };
    return response;
  }

  public mapToCreateProductImageResponse(source: ProductImage): CreateProductImageResponse {
    const response: CreateProductImageResponse = {
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

import { ProductImage } from '@infra/db/product-image/product-image.schema';
import { UpdateProductImageRequest } from './update-request';
import { UpdateProductImageResponse } from './update-response';

export class UpdateProductImageMapper {
  public mapToUpdateProductImageRequest(source: UpdateProductImageRequest): Partial<ProductImage>{
    const response: Partial<ProductImage> = {
      
    };
    return response;
  }

  public mapToUpdateProductImageResponse(source: ProductImage): UpdateProductImageResponse {
    const response: UpdateProductImageResponse = {
      
    };
    return response;
  }
}

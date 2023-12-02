import { ProductOptions } from '@common/product-options';
import { ProductSlugCheck } from '@common/product/slug-validator';
import { ProductStatusEnum } from '@infra/db/product/product.schema';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Validate } from 'class-validator';
export class UpdateProductRequest  {
    @ApiPropertyOptional()
    title: string;

    @ApiPropertyOptional()
    description: string;

    @ApiPropertyOptional()
    body: string;

    @ApiPropertyOptional()
    // @Validate(ProductSlugCheck)
    slug: string;

    @ApiPropertyOptional({type: ProductOptions})
    options: Record<string, string | Array<string>>;

    @ApiPropertyOptional()
    product_type: string;

    @ApiPropertyOptional()
    published_scope: string;

    @ApiPropertyOptional({enum: ProductStatusEnum})
    status: string;

    @ApiPropertyOptional()
    tags: string;

    @ApiPropertyOptional()
    vendor: string;
}

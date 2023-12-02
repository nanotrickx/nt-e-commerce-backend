import { ProductOptions } from '@common/product-options';
import { ProductSlugCheck } from '@common/product/slug-validator';
import { ProductStatusEnum } from '@infra/db/product/product.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';

export class CreateProductRequest  {
    @ApiProperty()
    title: string;


    @ApiProperty()
    description: string;

    @ApiProperty()
    body: string;

    @ApiProperty()
    @Validate(ProductSlugCheck)
    slug: string;

    @ApiProperty({type: ProductOptions})
    options: Record<string, string | Array<string>>;

    @ApiProperty()
    product_type: string;

    @ApiProperty()
    published_scope: string;

    @ApiProperty({enum: ProductStatusEnum})
    status: string;

    @ApiProperty()
    tags: string;

    @ApiProperty()
    vendor: string;
}

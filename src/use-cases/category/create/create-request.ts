import { CategorySlugCheck } from '@common/category/slug-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';

export class CreateCategoryRequest  {
    @ApiProperty()
    title: string;

    @ApiProperty()
    @Validate(CategorySlugCheck)
    slug: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    imgSrc: string;

    @ApiProperty()
    isMenu: boolean;

    @ApiProperty()
    status: string;
}

import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryRequest  {
    @ApiPropertyOptional()
    title: string;

    @ApiPropertyOptional()
    description: string;

    @ApiPropertyOptional()
    imgSrc: string;

    @ApiPropertyOptional()
    isMenu: boolean;

    @ApiPropertyOptional()
    status: string;
}

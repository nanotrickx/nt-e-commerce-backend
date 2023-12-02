import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UpdateProductVariantRequest } from '../update/update-request';
import { IsNotEmpty } from 'class-validator';

export class BulkVariantReplaceProductVariantRequest  {
    @ApiProperty()
    @IsNotEmpty()
    productId: string;

    @ApiPropertyOptional()
    isReplace: boolean;

    @ApiProperty()
    data: UpdateProductVariantRequest[]
}

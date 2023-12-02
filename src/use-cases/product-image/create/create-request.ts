import { ApiProperty } from '@nestjs/swagger';

export class CreateProductImageRequest  {
    @ApiProperty()
    product_id: string;

    @ApiProperty()
    position: string;

    @ApiProperty()
    alt: string;

    @ApiProperty()
    width: number;

    @ApiProperty()
    height: number;

    @ApiProperty()
    src: string;
}

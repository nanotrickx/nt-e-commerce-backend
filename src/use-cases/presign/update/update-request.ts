import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePresignRequest  {
    @ApiProperty()
    @IsNotEmpty()
    fileName: string;
}

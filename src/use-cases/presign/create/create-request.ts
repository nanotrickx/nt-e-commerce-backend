import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePresignRequest  {
    @ApiProperty()
    @IsNotEmpty()
    filePath: string;

    @ApiProperty()
    @IsNotEmpty()
    fileExtension: string;
}

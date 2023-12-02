import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ForgotPasswordRequest  {
    @ApiProperty()
    @IsNotEmpty()
    email: string;
}

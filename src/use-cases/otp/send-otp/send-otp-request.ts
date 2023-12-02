import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendOtpOtpRequest  {
    @ApiProperty()
    @IsNotEmpty()
    mobileNo: string;
}

export class VerifyOtpRequest  {
    @ApiProperty()
    @IsNotEmpty()
    mobileNo: string;

    @ApiProperty()
    @IsNotEmpty()
    otp: string;
}

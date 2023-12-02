import { UtcDateCheck } from '@common/utc-date-validator';
import {  ApiPropertyOptional } from '@nestjs/swagger';
import { Validate } from 'class-validator';

export class UpdateProfileRequest  {

    @ApiPropertyOptional()
    firstName: string;

    @ApiPropertyOptional()
    lastName: string;
}

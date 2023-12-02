import { UtcDateCheck } from '@common/utc-date-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';

export class CreateStripeWebhookRequest  {

    // @ApiProperty()
    // @IsNotEmpty()
    // signature: Record<string, string>;

    // @ApiProperty()
    // @IsNotEmpty()
    // "event-data": Record<string, any>;
}

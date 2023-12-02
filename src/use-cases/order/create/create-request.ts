import { AddressTypeDefinition } from '@common/address';
import { OrderStatusType, PaymentTransactionsType, ProductVariantListInput } from '@common/types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class CreateOrderRequest  {
    @ApiProperty({type: ProductVariantListInput})
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductVariantListInput)
    productVariantList: Array<Record<string, string>>;

    @ApiProperty({type: AddressTypeDefinition})
    buyerAddress: Record<string, string>;

    @ApiProperty({type: AddressTypeDefinition})
    shippingAddress: Record<string, string>;

    @ApiProperty()
    paymentMode: string;

    @ApiProperty({type: PaymentTransactionsType})
    paymentTransactions: Array<Record<string, string>>;

    @ApiProperty()
    mobile: string;

    @ApiProperty()
    email: string;

    @ApiProperty({type: OrderStatusType})
    orderStatus: Array<Record<string, string>>;

    @ApiProperty()
    notes: string;

    @ApiProperty()
    sessionId: string;

    @ApiProperty()
    currencyCode: string;

    @ApiProperty()
    status: string;
}

import { AddressTypeDefinition } from '@common/address';
import { OrderStatus } from '@common/order';
import { OrderStatusType, PaymentTransactionsType, ProductVariantListInput } from '@common/types';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderRequest  {
    @ApiPropertyOptional({type: ProductVariantListInput})
    productVariantList: Array<Record<string, string>>;

    @ApiPropertyOptional({type: AddressTypeDefinition})
    buyerAddress: Record<string, string>;

    @ApiPropertyOptional({type: AddressTypeDefinition})
    shippingAddress: Record<string, string>;

    @ApiPropertyOptional()
    paymentMode: string;

    @ApiPropertyOptional({type: PaymentTransactionsType})
    paymentTransactions: Record<string, string>;

    @ApiPropertyOptional()
    mobile: string;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional({type: OrderStatusType})
    orderStatus: Record<string, string>;

    @ApiPropertyOptional()
    notes: string;

    @ApiPropertyOptional()
    sessionId: string;

    @ApiPropertyOptional()
    currencyCode: string;

    @ApiPropertyOptional()
    status: OrderStatus;
}

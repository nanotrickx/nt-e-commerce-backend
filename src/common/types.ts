import { ApiProperty } from "@nestjs/swagger";
import { timeStamp } from "console";

export class ProductVariantListInput{
    @ApiProperty()
    variantId: string;
    @ApiProperty()
    qty: number;
}

export class PaymentTransactionsType{
    @ApiProperty()
    transactionId: string;
    @ApiProperty()
    paymentType: string;
    @ApiProperty()
    paymentGateway: string;
    @ApiProperty()
    amount: number;
    @ApiProperty()
    timestamp: number;
    @ApiProperty()
    status: string;
}

export class OrderStatusType{
    @ApiProperty()
    status: string;
    @ApiProperty()
    notes: string;
    @ApiProperty()
    timestamp: number
}

export class RazorpayOrder{
    amount: number;
    currency: string;
    receipt: string;
    partial_payment: boolean;
    notes: Record<string, string>;
}
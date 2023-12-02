
export class CreateOrderResponse {
    id: string;
    productVariantList: Array<Record<string, string>>;
    buyerAddress: Record<string, string>;
    shippingAddress: Record<string, string>;
    subTotal: number;
    total: number;
    tax: number;
    shippingCost: number;
    paymentMode: string;
    paymentTransactions: Array<Record<string, string>>;
    mobile: string;
    isMobileVerified: boolean;
    email: string;
    isEmailVerified: boolean;
    orderStatus: Array<Record<string, string | number>>;
    notes: string[];
    sessionId: string;
    accountId: string;
    currencyCode: string;
    status: string;
}
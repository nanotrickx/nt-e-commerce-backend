import { Order } from '@infra/db/order/order.schema';
import { PagedModel } from '@infra/db/helper';
import { GetOrderResponse } from './get-response';

export class GetOrderMapper {
  public mapToOrderResponse(source: Order): GetOrderResponse {
    const response: GetOrderResponse = {
      id: source.id,
      productVariantList: source.productVariantList,
      buyerAddress: source.buyerAddress,
      shippingAddress: source.shippingAddress,
      subTotal: source.subTotal,
      total: source.total,
      tax: source.tax,
      shippingCost: source.shippingCost,
      paymentMode: source.paymentMode,
      paymentTransactions: source.paymentTransactions,
      mobile: source.mobile,
      isMobileVerified: source.isMobileVerified,
      email: source.email,
      isEmailVerified: source.isEmailVerified,
      orderStatus: source.orderStatus,
      notes: source.notes,
      sessionId: source.sessionId,
      accountId: source.accountId,
      currencyCode: source.currencyCode,
      status: source.status,
      items: source.items
    };
    return response;
  }
}

import { Order } from '@infra/db/order/order.schema';
import { CreateOrderRequest } from './create-request';
import { CreateOrderResponse } from './create-response';
import { OrderStatus } from '@common/order';

export class CreateOrderMapper {
  public mapToCreateOrderRequest(source: CreateOrderRequest): Partial<Order>{
    const response: Partial<Order> = {
      productVariantList: source.productVariantList,
      buyerAddress:source.buyerAddress,
      shippingAddress: source.shippingAddress,
      paymentMode: source.paymentMode,
      paymentTransactions: source.paymentTransactions, 
      mobile: source.mobile,
      email: source.email,
      orderStatus: source.orderStatus,
      notes: [source.notes],
      sessionId: source.sessionId,
      currencyCode: source.currencyCode,
      status: OrderStatus.Draft
    };
    return response;
  }

  public mapToCreateOrderResponse(source: Order): CreateOrderResponse {
    const response: CreateOrderResponse = {
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
      status: source.status
    };
    return response;
  }
}

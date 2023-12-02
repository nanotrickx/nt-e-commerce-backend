import { Order } from '@infra/db/order/order.schema';
import { UpdateOrderRequest } from './update-request';
import { UpdateOrderResponse } from './update-response';
import { OrderStatus } from '@common/order';

export class UpdateOrderMapper {
  public mapToUpdateOrderRequest(source: UpdateOrderRequest): Partial<Order>{
    const response: Partial<any> = {
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
      status: source.status
    };
    return response;
  }

  public mapToUpdateOrderResponse(source: Order): UpdateOrderResponse {
    const response: UpdateOrderResponse = {
      
    };
    return response;
  }
}

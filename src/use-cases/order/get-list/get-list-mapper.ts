import { SortingDirection } from '@common/sorting-direction';
import { Order } from '@infra/db/order/order.schema';
import { PagedModel } from '@infra/db/helper';
import { GetListOrderResponse } from './get-list-response';

export class GetListOrderMapper {
  public mapToOrderResponse(request: PagedModel<Order>): GetListOrderResponse {
    const response: GetListOrderResponse = {
      orderByPropertyName: request.orderByPropertyName,
      sortingDirection: SortingDirection.Ascending,
      pageNumber: request.pageNumber,
      pageSize: request.pageSize,
      totalCount: request.totalCount,
      totalPages: request.totalPages,
      items: request.items.map((x) => {
        return {
          id:x.id,
          productVariantList: x.productVariantList,
          buyerAddress: x.buyerAddress,
          shippingAddress: x.shippingAddress,
          subTotal: x.subTotal,
          total: x.total,
          tax: x.tax,
          shippingCost: x.shippingCost,
          paymentMode: x.paymentMode,
          paymentTransactions: x.paymentTransactions,
          mobile: x.mobile,
          isMobileVerified: x.isMobileVerified,
          email: x.email,
          isEmailVerified: x.isEmailVerified,
          orderStatus: x.orderStatus,
          notes: x.notes,
          sessionId: x.sessionId,
          accountId: x.accountId,
          currencyCode: x.currencyCode,
          status: x.status,
          items: x.items,
          createdAt: x.created_at,
          createdBy: x.created_by,
          updatedAt: x.modified_at,
          updatedBy: x.modified_by
        };
      })
    };
    return response;
  }
}

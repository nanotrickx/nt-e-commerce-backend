import { Controller, Get, HttpCode, Query, Headers, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetListOrderMapper } from './get-list-mapper';
import { GetListOrderRequest } from './get-list-request';
import { OrderService } from '@infra/db/order/order.service';
import { UserService } from '@infra/db/user/user.service';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class GetListOrderController {
  constructor(
    private readonly getListService: OrderService,
    private readonly userService: UserService,
    private readonly mapper: GetListOrderMapper
  ) {}

  @Get()
  @HttpCode(200)
  async execute(@Query() query: GetListOrderRequest, @Headers() headers, @Req() req): Promise<any> {
    let sessionId = null;
    if(headers["session-id"] && headers["session-id"].length > 5){
      sessionId = headers["session-id"];
    }
    let accountId = null;
    // console.log(req)
    let user:any = {}
    if(req["user"] && req["user"].email){
      user =await this.userService.findOne({filter: { email: req["user"].email}});
      accountId = user.id;
      sessionId = null;
    }
    
    if(user.roles && user.roles.includes("admin")){
      const result = await this.getListService.pagedAsync(
        query.pageNumber,
        query.pageSize,
        query.orderByPropertyName,
        query.sortingDirection,
        {status: query.status}
      );
      const response = this.mapper.mapToOrderResponse(result);
      // console.log(response);
      return response;
    }else{
      if(sessionId !== null || accountId !== null){
        // console.log("headers", headers["session-id"])
        const result = await this.getListService.pagedAsync(
          query.pageNumber,
          query.pageSize,
          query.orderByPropertyName,
          query.sortingDirection,
          {sessionId: sessionId, accountId: accountId, status: query.status}
        );
        const response = this.mapper.mapToOrderResponse(result);
        return response;
      }else{
        return {};
      }
    }
    
  }
}

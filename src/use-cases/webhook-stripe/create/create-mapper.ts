import { CreateStripeWebhookRequest } from './create-request';

export class CreateStripeWebhookMapper {
  public mapToCreateRequest(source: CreateStripeWebhookRequest): any{
    // const response: any = {
    //   signature: source.signature,
    //   "event-data": source["event-data"],
    // };
    // return response;
  }

  // public mapToCreateResponse(source: Campaign): CreateCampaignResponse {
  //   const response: CreateCampaignResponse = {
  //     id: source.id,
  //   };
  //   return response;
  // }
}

import { Webhook } from '@infra/db/webhook/webhook.schema';
import { CreateWebhookRequest } from './create-request';
import { CreateWebhookResponse } from './create-response';

export class CreateWebhookMapper {
  public mapToCreateWebhookRequest(source: CreateWebhookRequest): Partial<Webhook>{
    const response: Partial<Webhook> = {
      
    };
    return response;
  }

  public mapToCreateWebhookResponse(source: Webhook): CreateWebhookResponse {
    const response: CreateWebhookResponse = {
      
    };
    return response;
  }
}

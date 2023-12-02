import { Module } from '@nestjs/common';
  /* PLOP_INJECT_IMPORT */
import { PhonepeEventModule } from './phonepe-event/phonepe-event.module';
import { StripeEventsModule } from './stripe-events/stripe-events.module';
import { OrderItemModule } from './order-item/order-item.module';
import { VerifiedMobileNumberModule } from './verified-mobile-number/verified-mobile-number.module';
import { WebhookModule } from './webhook/webhook.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { ProductVariantModule } from './product-variant/product-variant.module';
import { ProductImageModule } from './product-image/product-image.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { UnitOfWorkService } from './unit-of-work.service';
import { MongooseModule } from '@nestjs/mongoose';
const modules = [
  /* PLOP_INJECT_MODULE */
	PhonepeEventModule,
	StripeEventsModule,
	OrderItemModule,
	VerifiedMobileNumberModule,
	WebhookModule,
	CategoryModule,
	OrderModule,
	ProductVariantModule,
	ProductImageModule,
	ProductModule,
  MongooseModule,
	UserModule
];
const providers = [
  UnitOfWorkService
];
@Module({
  imports: [...modules],
  providers: [...providers],
  exports: [...modules, ...providers]
})
export class MongoDbModule {}

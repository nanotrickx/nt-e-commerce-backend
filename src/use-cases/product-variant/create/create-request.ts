import { presentmentPrices } from '@infra/db/product-variant/product-variant.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateProductVariantRequest  {

    @ApiProperty()
    title: string;

    @ApiProperty()
    barcode: string;

    @ApiProperty()
    fulfillment_service: string;

    @ApiProperty()
    grams: number;

    @ApiProperty()
    image_id: string;

    @ApiProperty()
    inventory_item_id: string;

    @ApiProperty()
    inventory_management: string;

    @ApiProperty()
    inventory_policy: string;

    @ApiProperty()
    inventory_quantity: string;

    @ApiProperty()
    option: Record<string, string>;

    @ApiProperty({type: Object})
    presentment_prices: Record<string, any>;

    @ApiProperty()
    position: number;

    @ApiProperty()
    product_id: string;

    @ApiProperty()
    requires_shipping: boolean;

    @ApiProperty()
    sku: string;

    @ApiProperty()
    taxable: boolean;

    @ApiProperty()
    tax_code: string;

    @ApiProperty()
    weight: string;

    @ApiProperty()
    weight_unit: string;

}

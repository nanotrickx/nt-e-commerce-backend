import { presentmentPrices } from '@infra/db/product-variant/product-variant.schema';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductVariantRequest  {
    @ApiPropertyOptional()
    title: string;

    @ApiPropertyOptional()
    barcode: string;

    @ApiPropertyOptional()
    fulfillment_service: string;

    @ApiPropertyOptional()
    grams: number;

    @ApiPropertyOptional()
    image_id: string;

    @ApiPropertyOptional()
    inventory_item_id: string;

    @ApiPropertyOptional()
    inventory_management: string;

    @ApiPropertyOptional()
    inventory_policy: string;

    @ApiPropertyOptional()
    inventory_quantity: string;

    @ApiPropertyOptional()
    option: Record<string, string>;

    @ApiPropertyOptional({type: Array<any>})
    presentment_prices:  Record<string, any>;

    @ApiPropertyOptional()
    position: number;

    @ApiPropertyOptional()
    product_id: string;

    @ApiPropertyOptional()
    requires_shipping: boolean;

    @ApiPropertyOptional()
    sku: string;

    @ApiPropertyOptional()
    taxable: boolean;

    @ApiPropertyOptional()
    tax_code: string;

    @ApiPropertyOptional()
    weight: string;

    @ApiPropertyOptional()
    weight_unit: string;
}

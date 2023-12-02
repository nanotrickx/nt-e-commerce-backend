import { presentmentPrices } from "@infra/db/product-variant/product-variant.schema";

export class CreateProductVariantResponse {
    id: string;
    title: string;
    barcode: string;
    fulfillment_service: string;
    grams: number;
    image_id: string;
    inventory_item_id: string;
    inventory_management: string;
    inventory_policy: string;
    inventory_quantity: string;
    option: Record<string, string>;
    presentment_prices: Record<string, any>;
    position: number;
    product_id: string;
    requires_shipping: boolean;
    sku: string;
    taxable: boolean;
    tax_code: string;
    weight: string;
    weight_unit: string;
}
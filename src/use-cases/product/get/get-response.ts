import { ProductImage } from "@infra/db/product-image/product-image.schema";
import { ProductVariant } from "@infra/db/product-variant/product-variant.schema";
import { Date } from "mongoose";

export class GetProductResponse {
    id: string;
    title: string;
    description: string;
    body: string;
    slug: string;
    image?: Record<string,string>;
    images: Array<ProductImage>;
    options: Record<string, string | Array<string>>;
    product_type: string;
    published_scope: string;
    status: string;
    tags: string;
    vendor: string;
    variants: Array<ProductVariant>;
    published_at: string;
    created_at: Date;
    updated_at: Date;
}
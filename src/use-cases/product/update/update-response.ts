import { ProductImageType } from "@common/image";
import { Date } from "mongoose";

export class UpdateProductResponse {
    id: string;
    title: string;
    description: string;
    body: string;
    slug: string;
    image?: ProductImageType;
    product_type: string;
    published_scope: string;
    status: string;
    tags: string;
    vendor: string;
    published_at: string;
    created_at: Date;
    updated_at: Date;
}
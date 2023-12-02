import { ApiProperty } from "@nestjs/swagger";
import { Timestamp } from "./timestamp-class";

export class ProductImageType extends Timestamp {
  id: string;
  @ApiProperty()
  product_id: string;
  @ApiProperty()
  position: string;
  @ApiProperty()
  alt: string;
  @ApiProperty()
  width: number;
  @ApiProperty()
  height: number;
  @ApiProperty()
  src: string;
}
  
import { ApiProperty } from "@nestjs/swagger";

export class ProductOptions{
  @ApiProperty()
  name: string;
  @ApiProperty()
  position: string;
  @ApiProperty()
  values: Array<string>;
}
  
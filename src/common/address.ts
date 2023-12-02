import { ApiProperty } from "@nestjs/swagger";

export enum AddressType {
    Home = 'home',
    Office = 'office'
}

export class AddressTypeDefinition{
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  postalCode: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  addressType: AddressType;
}
  
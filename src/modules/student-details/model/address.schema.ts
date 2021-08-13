
import { ApiProperty } from '@nestjs/swagger';

export class Address{

  @ApiProperty({ example: 'Banglore', description: 'City' })
  city: string;

  @ApiProperty({ example: 'Karnataka', description: 'State' })
  state: string;

  @ApiProperty({ example: 'India', description: 'Country' })
  country:string;

}

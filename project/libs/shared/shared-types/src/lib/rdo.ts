import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SuccessMessageRdoApiDescription {
  @ApiProperty({
    description: 'Message about successfully operation completion',
    example: 'Operation was successfully completed',
  })
  @Expose()
  public message: string;

  constructor(data: SuccessMessageRdoApiDescription) {
    this.message = data.message;
  }
}

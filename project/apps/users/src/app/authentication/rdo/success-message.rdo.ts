import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SuccessMessageRdo {
  @ApiProperty({
    description: 'Message about successfully operation completion',
    example: 'Operation was successfully completed',
  })
  @Expose()
  public message: string;
}

import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessMessageRdo {
  @ApiProperty({
    description: 'Message about successfully operation completion',
    example: 'Operation was successfully completed',
  })
  @Expose()
  public message: string;
}

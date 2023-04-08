import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AccessTokenRdo {
  @ApiProperty({
    description: 'Access token',
    example: '#hashstring_',
  })
  @Expose()
  public accessToken: string;

  constructor(data: AccessTokenRdo) {
    this.accessToken = data.accessToken;
  }
}

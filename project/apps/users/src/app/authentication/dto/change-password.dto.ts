import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User id',
    example: '123',
  })
  public id: string;

  @ApiProperty({
    description: "Old user's password",
    example: '123456',
  })
  public oldPassword: string;

  @ApiProperty({
    description: "New user's password",
    example: 'qwerty',
  })
  public newPassword: string;

  @ApiProperty({
    description: "New user's password confirmation",
    example: 'qwerty',
  })
  public newPasswordConfirmation: string;
}

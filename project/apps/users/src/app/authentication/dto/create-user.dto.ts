import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'YE',
  })
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  public password: string;

  @ApiProperty({
    description: 'User password confirmation',
    example: '123456',
  })
  public passwordConfirmation: string;

  constructor(data: CreateUserDto) {
    this.email = data.email;
    this.name = data.name;
    this.password = data.password;
    this.passwordConfirmation = data.passwordConfirmation;
  }
}

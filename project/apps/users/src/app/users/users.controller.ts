import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { UserRdo } from './rdo/user.rdo';
import { UsersService } from './users.service';
import { fillObject } from '@project/util/util-core';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.usersService.getUser(id);
    return fillObject(UserRdo, existUser);
  }
}

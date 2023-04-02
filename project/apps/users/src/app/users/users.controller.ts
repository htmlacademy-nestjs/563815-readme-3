import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserRdo } from "./rdo/user.rdo";
import { fillObject } from "@project/util/util-core";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: "User found"
  })
  @Get(":id")
  public async show(@Param("id") id: string) {
    const existUser = await this.usersService.getUser(id);
    return fillObject(UserRdo, existUser);
  }
}

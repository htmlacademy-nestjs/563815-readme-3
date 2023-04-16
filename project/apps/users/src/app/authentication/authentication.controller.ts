import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ERROR_GENERIC_ERROR, SUCCESS_USER_CREATED } from './constants';
import {
  NewPasswordFromClient,
  SuccessMessageRdoApiDescription,
  UserFromClient,
} from '@project/shared/shared-types';
import { AccessTokenRdo } from './rdo/access-token.rdo';
import { AuthenticationService } from './authentication.service';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiResponse({
    type: SuccessMessageRdoApiDescription,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('new-user')
  public async createNewUser(@Body() dto: UserFromClient) {
    await this.authService.createNewUser(dto);

    return SUCCESS_USER_CREATED;
  }

  @ApiResponse({
    type: AccessTokenRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: UserFromClient) {
    const isVerifiedUser = await this.authService.isVerifiedUser(dto);

    if (!isVerifiedUser) {
      return 'accessToken';
    } else {
      throw new UnauthorizedException(ERROR_GENERIC_ERROR);
    }
  }

  @ApiResponse({
    type: SuccessMessageRdoApiDescription,
    status: HttpStatus.OK,
    description: 'Password has been successfully changed.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Old password wrong.',
  })
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  public async changePassword(@Body() dto: NewPasswordFromClient) {
    await this.authService.changePassword(dto);
  }
}

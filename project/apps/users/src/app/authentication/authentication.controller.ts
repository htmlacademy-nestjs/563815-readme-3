import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AccessTokenRdo } from './rdo/access-token.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ERROR_GENERIC_ERROR, SUCCESS_USER_CREATED } from './constants';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SuccessMessageRdo } from './rdo/success-message.rdo';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiResponse({
    type: SuccessMessageRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('new-user')
  public async createNewUser(@Body() dto: CreateUserDto) {
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
  public async login(@Body() dto: LoginUserDto) {
    const isVerifiedUser = await this.authService.isVerifiedUser(dto);

    if (!isVerifiedUser) {
      return 'accessToken';
    } else {
      throw new UnauthorizedException(ERROR_GENERIC_ERROR);
    }
  }

  @ApiResponse({
    type: SuccessMessageRdo,
    status: HttpStatus.OK,
    description: 'Password has been successfully changed.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Old password wrong.',
  })
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  public async changePassword(@Body() dto: ChangePasswordDto) {
    const wasChanged = await this.authService.changePassword(dto);
  }
}

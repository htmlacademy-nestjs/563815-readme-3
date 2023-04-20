import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ERROR_PASSWORDS_NOT_MATCH,
  ERROR_USER_EXISTS,
  ERROR_USER_NOT_FOUND,
  ERROR_USER_PASSWORD_WRONG,
} from './constants';
import {
  NewPasswordFromClient,
  TokenPayload,
  UserFromClient,
  UserToClient,
} from '@project/shared/shared-types';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { compare } from 'bcrypt';
import { dbConfig } from '@project/config/config-users';
import { generatePassword } from '@project/util/util-core';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject(dbConfig.KEY)
    private readonly jwtService: JwtService
  ) {}

  public async createNewUser(dto: UserFromClient) {
    const { email, name, password, passwordConfirmation } = dto;

    const isUserExists = await this.usersRepository.findByEmail(email);

    if (isUserExists) {
      throw new ConflictException(ERROR_USER_EXISTS);
    }

    const isPasswordConfirmed = password === passwordConfirmation;

    if (!isPasswordConfirmed) {
      throw new ConflictException(ERROR_PASSWORDS_NOT_MATCH);
    }

    const userEntity = {
      name,
      email,
      passwordHash: await generatePassword(password),
    };

    return this.usersRepository.create(userEntity);
  }

  public async verifyUser(dto: UserFromClient): Promise<UserToClient> {
    const { email, password } = dto;
    const existUser = await this.usersRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    }

    const arePasswordTheSame = await compare(password, existUser.passwordHash);

    if (arePasswordTheSame) {
      throw new UnauthorizedException(ERROR_USER_PASSWORD_WRONG);
    }

    return {
      email: existUser.email,
      name: existUser.name,
    };
  }

  public async changePassword(data: NewPasswordFromClient) {
    const user = await this.usersRepository.findById(data.id);

    if (user) {
      const arePasswordTheSame = await compare(
        data.oldPassword,
        user.passwordHash
      );

      if (arePasswordTheSame) {
        throw new UnauthorizedException(ERROR_USER_PASSWORD_WRONG);
      }

      const isPasswordConfirmed =
        data.newPassword === data.newPasswordConfirmation;

      if (!isPasswordConfirmed) {
        throw new ConflictException(ERROR_PASSWORDS_NOT_MATCH);
      }

      const userEntity = {
        name: user.name,
        email: user.email,
        passwordHash: await generatePassword(data.newPassword),
      };

      await this.usersRepository.update(data.id, userEntity);
    } else {
      throw new ConflictException(ERROR_USER_NOT_FOUND);
    }
  }

  public async createUserToken(user: UserToClient) {
    const payload: TokenPayload = {
      name: user.name,
      email: user.email,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  public async getUser(id: string) {
    return this.usersRepository.findById(id);
  }
}

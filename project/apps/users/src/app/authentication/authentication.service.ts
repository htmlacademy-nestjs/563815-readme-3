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
import { ChangePasswordDto } from './dto/change-password.dto';
import { ConfigType } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepositoryEntity } from '../users/user-repository-entity';
import { UsersRepository } from '../users/users.repository';
import { compare } from 'bcrypt';
import { dbConfig } from '@project/config/config-users';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject(dbConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof dbConfig>
  ) {
    console.log(databaseConfig.host);
    console.log(databaseConfig.user);
  }

  public async createNewUser(dto: CreateUserDto) {
    const { email, name, password, passwordConfirmation } = dto;

    const isUserExists = await this.usersRepository.findByEmail(email);

    if (isUserExists) {
      throw new ConflictException(ERROR_USER_EXISTS);
    }

    const isPasswordConfirmed = password === passwordConfirmation;

    if (!isPasswordConfirmed) {
      throw new ConflictException(ERROR_PASSWORDS_NOT_MATCH);
    }

    const userEntity = await new UserRepositoryEntity({
      name,
      email,
    }).setPassword(password);

    return this.usersRepository.create(userEntity);
  }

  public async isVerifiedUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.usersRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(ERROR_USER_NOT_FOUND);
    }

    const arePasswordTheSame = await compare(password, existUser.passwordHash);

    if (arePasswordTheSame) {
      throw new UnauthorizedException(ERROR_USER_PASSWORD_WRONG);
    }

    return true;
  }

  public async changePassword(data: ChangePasswordDto) {
    const user = await this.usersRepository.findById(data.id);

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

    const userEntity = new UserRepositoryEntity(user);

    await userEntity.setPassword(data.newPassword);

    return this.usersRepository.update(data.id, userEntity);
  }
}

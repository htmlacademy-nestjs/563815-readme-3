import { Module } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersRepository, UsersService],
  exports: [UsersRepository],
  controllers: [UsersController]
})
export class UsersModule {
}

import { LikesRepository } from './likes.repository';
import { LikesService } from './likes.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [LikesService, LikesRepository],
})
export class LikesModule {}

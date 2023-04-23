import { LikesService } from './likes.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [LikesService],
})
export class LikesModule {}

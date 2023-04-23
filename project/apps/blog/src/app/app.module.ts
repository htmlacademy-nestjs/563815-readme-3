import { LikesModule } from './likes/likes.module';
import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [PrismaModule, TagModule, PostModule, LikesModule],
})
export class AppModule {}

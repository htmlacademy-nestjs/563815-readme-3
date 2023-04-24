import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { LikeFromClient } from '@project/shared/shared-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikesRepository
  implements CRUDRepository<LikeFromClient, void, number>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(like: LikeFromClient) {
    this.prisma.databaseLike.create({ data: like });
  }

  public async destroy(id: number) {
    await this.prisma.databaseLike.delete({
      where: {
        id,
      },
    });
  }
}

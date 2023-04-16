import { BlogTagToClient } from '@project/shared/shared-types';
import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagRepository
  implements CRUDRepository<BlogTagToClient, BlogTagToClient, number>
{
  constructor(private readonly prisma: PrismaService) {}

  public findById(id: number) {
    return this.prisma.databaseTag.findFirst({
      where: {
        id,
      },
    });
  }

  public find(ids: number[] = []) {
    return this.prisma.databaseTag.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined,
        },
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  public findAll() {
    return this.prisma.databaseTag.findMany();
  }
}

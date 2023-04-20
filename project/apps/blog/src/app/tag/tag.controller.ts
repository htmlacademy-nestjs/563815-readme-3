import { Controller, Get, Param } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    return this.tagService.getTag(id);
  }
}

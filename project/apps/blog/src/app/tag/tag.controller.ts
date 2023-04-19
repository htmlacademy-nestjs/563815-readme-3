import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/:id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.getTag(id);
  }
}

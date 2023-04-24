import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { TagRdo } from './rdo/tag.rdo';
import { TagService } from './tag.service';

@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiResponse({
    type: [TagRdo],
    status: HttpStatus.OK,
    description: 'Get all tags',
  })
  @Get('/')
  async showAll() {
    return this.tagService.getTag();
  }
}

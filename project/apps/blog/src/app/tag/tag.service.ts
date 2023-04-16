import { Injectable } from '@nestjs/common';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async getTag(id: number) {
    return this.tagRepository.findById(id);
  }

  async getTags() {
    return this.tagRepository.find();
  }
}

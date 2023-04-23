import { Injectable } from '@nestjs/common';
import { LikeFromClient } from '@project/shared/shared-types';
import { LikesRepository } from './likes.repository';

@Injectable()
export class LikesService {
  constructor(private readonly likesRepository: LikesRepository) {}

  create(like: LikeFromClient) {
    this.likesRepository.create(like);
  }

  destroy(id: number) {
    this.likesRepository.destroy(id);
  }
}

import {
  ArrayMaxSize,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  BlogTagToClient,
  PostStatus,
  PostStatusEnum,
  PostType,
  PostTypeEnum,
} from '@project/shared/shared-types';
import {
  ERROR_POST_AUTHOR_ID_IS_EMPTY,
  ERROR_POST_AUTHOR_ID_IS_WRONG_TYPE,
  ERROR_POST_STATUS_IS_EMPTY,
  ERROR_POST_STATUS_IS_WRONG_TYPE,
  ERROR_POST_TAGS_COUNT_IS_WRONG,
  ERROR_POST_TYPE_IS_EMPTY,
  ERROR_POST_TYPE_IS_WRONG_TYPE,
  TAGS_COUNT_MAX,
} from '../constants';
import { ApiProperty } from '@nestjs/swagger';
import { DatabasePost } from '@prisma/client';

export class NewBlogPostFromClient
  implements
    Omit<DatabasePost, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'>
{
  @ApiProperty({
    description: 'Author id',
    example: 1,
    required: true,
  })
  @IsNotEmpty({ message: ERROR_POST_AUTHOR_ID_IS_EMPTY })
  @IsString({ message: ERROR_POST_AUTHOR_ID_IS_WRONG_TYPE })
  authorId: number;

  @ApiProperty({
    description: 'Post type',
    type: PostTypeEnum,
    example: 'video',
    required: true,
  })
  @IsNotEmpty({ message: ERROR_POST_TYPE_IS_EMPTY })
  @IsIn(Object.values(PostTypeEnum), {
    message: ERROR_POST_TYPE_IS_WRONG_TYPE,
  })
  type: PostType;

  @ApiProperty({
    description: 'Post status',
    type: PostStatusEnum,
    example: 'published',
    required: true,
  })
  @IsNotEmpty({ message: ERROR_POST_STATUS_IS_EMPTY })
  @IsIn(Object.values(PostStatusEnum), {
    message: ERROR_POST_STATUS_IS_WRONG_TYPE,
  })
  status: PostStatus;

  @ApiProperty({
    description: 'Post announcement',
    example: 'Post announcement',
    required: false,
  })
  @IsString()
  @IsOptional()
  announcement: string;

  @ApiProperty({
    description: 'External url',
    example: 'https://example.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  externalUrl: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  quoteAuthor: string;

  @ApiProperty({
    description: 'Post text',
    example: 'This was a pretty tale. I liked it.',
    required: false,
  })
  @IsOptional()
  @IsString()
  text: string;

  @ApiProperty({
    description: 'Post title',
    example: 'Song about a bird',
    required: false,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Original post id',
    example: 122,
    required: false,
  })
  @IsOptional()
  @IsString()
  originalPostId: number;

  @ApiProperty({
    description: 'Original author id',
    example: 71,
    required: false,
  })
  @IsOptional()
  @IsString()
  originalAuthorId: number;

  @ApiProperty({
    description: 'Is repost',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isRepost: boolean;

  @ApiProperty({
    description: 'Is repost',
    isArray: true,
    example: [
      {
        id: 1,
        name: 'tag1',
      },
    ],
  })
  @ArrayMaxSize(TAGS_COUNT_MAX, { message: ERROR_POST_TAGS_COUNT_IS_WRONG })
  tags: BlogTagToClient[];

  constructor(data: NewBlogPostFromClient) {
    this.announcement = data.announcement;
    this.authorId = data.authorId;
    this.externalUrl = data.externalUrl;
    this.quoteAuthor = data.quoteAuthor;
    this.text = data.text;
    this.title = data.title;
    this.type = data.type;
    this.status = data.status;
    this.originalPostId = data.originalPostId;
    this.originalAuthorId = data.originalAuthorId;
    this.isRepost = data.isRepost;
    this.tags = data.tags;
  }
}

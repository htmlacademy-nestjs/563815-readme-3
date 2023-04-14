import { danielAuthorMock, sarahAuthorMock } from './mocks/authors';
import {
  linkPostMock,
  photoPostMock,
  quotePostMock,
  textPostMock,
  videoPostMock,
} from './mocks/posts';
import { PrismaClient } from '@prisma/client';
import { commentsMock } from './mocks/comments';
import { tagsMock } from './mocks/tags';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.author.createMany({
    data: [danielAuthorMock, sarahAuthorMock],
  });

  console.info('️✍️ Authors were filled!');

  await prisma.post.createMany({
    data: [
      videoPostMock,
      quotePostMock,
      linkPostMock,
      photoPostMock,
      textPostMock,
    ],
  });

  console.info('️📰 Posts were filled!');

  await prisma.tag.createMany({
    data: tagsMock,
  });

  console.info('️🏁 Tags were filled!');

  await prisma.comment.createMany({
    data: commentsMock,
  });

  console.info('️🤡 Comments were filled!');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });

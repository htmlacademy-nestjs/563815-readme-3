/*
  Warnings:

  - Added the required column `author_id` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_author_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "post_author";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "post_original_author";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "author_id" INTEGER NOT NULL,
ADD COLUMN     "original_author_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "post_author" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "post_original_author" FOREIGN KEY ("original_author_id") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

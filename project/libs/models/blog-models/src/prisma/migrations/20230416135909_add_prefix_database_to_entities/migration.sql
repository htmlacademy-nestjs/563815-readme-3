/*
  Warnings:

  - The `status` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_CommentToPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DatabasePostStatus" AS ENUM ('draft', 'published', 'archived');

-- CreateEnum
CREATE TYPE "DatabasePostType" AS ENUM ('video', 'text', 'quote', 'photo', 'link');

-- DropForeignKey
ALTER TABLE "_CommentToPost" DROP CONSTRAINT "_CommentToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentToPost" DROP CONSTRAINT "_CommentToPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_B_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "status",
ADD COLUMN     "status" "DatabasePostStatus" NOT NULL DEFAULT 'draft',
DROP COLUMN "type",
ADD COLUMN     "type" "DatabasePostType" NOT NULL DEFAULT 'text';

-- DropTable
DROP TABLE "_CommentToPost";

-- DropTable
DROP TABLE "_PostToTag";

-- DropEnum
DROP TYPE "PostStatus";

-- DropEnum
DROP TYPE "PostType";

-- CreateTable
CREATE TABLE "_DatabasePostToDatabaseTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DatabaseCommentToDatabasePost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DatabasePostToDatabaseTag_AB_unique" ON "_DatabasePostToDatabaseTag"("A", "B");

-- CreateIndex
CREATE INDEX "_DatabasePostToDatabaseTag_B_index" ON "_DatabasePostToDatabaseTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DatabaseCommentToDatabasePost_AB_unique" ON "_DatabaseCommentToDatabasePost"("A", "B");

-- CreateIndex
CREATE INDEX "_DatabaseCommentToDatabasePost_B_index" ON "_DatabaseCommentToDatabasePost"("B");

-- AddForeignKey
ALTER TABLE "_DatabasePostToDatabaseTag" ADD CONSTRAINT "_DatabasePostToDatabaseTag_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DatabasePostToDatabaseTag" ADD CONSTRAINT "_DatabasePostToDatabaseTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DatabaseCommentToDatabasePost" ADD CONSTRAINT "_DatabaseCommentToDatabasePost_A_fkey" FOREIGN KEY ("A") REFERENCES "comments"("comment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DatabaseCommentToDatabasePost" ADD CONSTRAINT "_DatabaseCommentToDatabasePost_B_fkey" FOREIGN KEY ("B") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

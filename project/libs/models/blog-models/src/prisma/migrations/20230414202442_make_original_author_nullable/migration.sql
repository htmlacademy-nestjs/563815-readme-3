-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "post_original_author";

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "original_author_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "post_original_author" FOREIGN KEY ("original_author_id") REFERENCES "authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

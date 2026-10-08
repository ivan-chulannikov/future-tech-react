/*
  Warnings:

  - Added the required column `bannerImageAlt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bannerImageHeight` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bannerImageSrc` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bannerImageWidth` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentIntroduction` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "bannerImageAlt" TEXT NOT NULL,
ADD COLUMN     "bannerImageHeight" INTEGER NOT NULL,
ADD COLUMN     "bannerImageSrc" TEXT NOT NULL,
ADD COLUMN     "bannerImageWidth" INTEGER NOT NULL,
ADD COLUMN     "contentIntroduction" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PostSection" (
    "id" SERIAL NOT NULL,
    "postId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "paragraphs" TEXT[],
    "order" INTEGER NOT NULL,

    CONSTRAINT "PostSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PostSection_postId_idx" ON "PostSection"("postId");

-- AddForeignKey
ALTER TABLE "PostSection" ADD CONSTRAINT "PostSection_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

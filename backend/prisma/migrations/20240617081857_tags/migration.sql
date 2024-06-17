/*
  Warnings:

  - Added the required column `hastags` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishedDate` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "hastags" TEXT NOT NULL,
ADD COLUMN     "publishedDate" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT NOT NULL;

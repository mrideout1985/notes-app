/*
  Warnings:

  - Made the column `description` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "body" DROP NOT NULL;

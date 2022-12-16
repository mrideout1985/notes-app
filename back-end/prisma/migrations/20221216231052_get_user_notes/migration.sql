/*
  Warnings:

  - You are about to drop the column `userId` on the `Article` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_userId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
